/*
 * @lc app=leetcode.cn id=160 lang=typescript
 *
 * [160] 相交链表
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

function getIntersectionNode(
	headA: ListNode | null,
	headB: ListNode | null
): ListNode | null {
	// let fast = headA;
	// let slow = headB;
	// while(1){
	//     if(fast === slow){

	//     }
	// }
	// 脑子瓦特了真没做出来，还想用快慢指针
	// 直接找一遍长度，让短的对齐长的并行next就能找到了

	let a = headA;
	let b = headB;
	let la = 0;
	let lb = 0;
	while (a) {
		a = a.next;
		la++;
	}
	while (b) {
		b = b.next;
		lb++;
	}
	let c = la > lb ? headA : headB;
	let d = la > lb ? headB : headA;
	let lc = Math.abs(la - lb);
	while (lc--) {
		c = c.next;
	}
	while (c && d) {
		if (c === d) {
			return c;
		} else {
			c = c.next;
			d = d.next;
		}
	}
	return null;
}

// 用空间换时间的话，直接复制整个链表并且变成双向的，然后从尾部开始迭代就能搞出来，O(m+n)
// @lc code=end
