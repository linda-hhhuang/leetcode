/*
 * @lc app=leetcode.cn id=142 lang=typescript
 *
 * [142] 环形链表 II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function detectCycle(head: ListNode | null): ListNode | null {
	/* 
        快慢指针，重点是，慢指针进环之后必然会在第一轮装到快指针，怎么证明
        只能是分情况枚举一下，首先在环大小为2,3的时候，快指针无论在哪，慢指针都会在第一轮撞到，
        环>4的时候，快指针由于步长为2必然会在第一轮赶上慢指针

        慢指针走过的路t1=无环+a
        这时候快不懂，慢走一圈什么时候撞到


        好吧，没想出来，还是查了答案，有点数学+结构的解题思路
        前面的做法都是正确的，只是这个时候需要重审我们的已有条件
        假设 a+b = 有环
        t1 = 无环 + a
        2t1 = 无环 + a + N有环  = 无环 + a + N(a + b)
        所以 无环 + a = N(a+b)
        其实这里还看不出来啥，但我们要清楚，我们最后要算的是无环
        所以要把无环提出来
        所以 无环 = N(a+b) - a ,但还是看看不出来啥，尝试把b提取出来
        所以 无环 = Na + Nb - a + b - b = (N-1)(a+b) + b
        这就有东西了，这说明无环和b之间的差距，只有N-1个有环，也就是说，现在两个指针分别从起点和相遇点再往后面走b步，这样以后剩下的路就是N-1个有环，那么必然在交叉点相遇！


    */

	if (!head || !head.next) return null;

	let fast = head.next.next,
		slow = head.next;

	while (1) {
		if (!fast) return null;
		if (fast === slow) {
			break;
		}
		fast = fast.next;
		if (!fast) return null;
		fast = fast.next;
		slow = slow.next;
	}
	let start = head,
		ahead = slow;
	// console.log(start.val, ahead.val);
	while (start !== ahead) {
		start = start.next;
		ahead = ahead.next;
	}
	return start;
}
// @lc code=end
