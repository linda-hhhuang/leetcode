/*
 * @lc app=leetcode.cn id=19 lang=typescript
 *
 * [19] 删除链表的倒数第 N 个结点
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

// function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
// 	if (!head) return head;
// 	function deleteN(number) {
// 		if (number === 0) {
// 			head = head.next;
// 		} else {
// 			let prev = head;
// 			while (--number) {
// 				prev = prev ? prev.next : undefined;
// 			}
// 			if (prev && prev.next) {
// 				prev.next = prev.next.next;
// 			}
// 		}
// 	}
// 	let length = 0;
// 	let curr = head;
// 	while (curr) {
// 		length++;
// 		curr = curr.next;
// 	}
// 	if (length >= n) {
// 		deleteN(length - n);
// 	}
// 	return head;
// }

// 上面的纯粹的模拟，直接遍历一遍数数然后倒着推，不过有更好的解法

// 其实搞一个快慢指针，fast先走n步，然后fast和slow同步next，fast先到结尾则代表slow现在在倒数第n个

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
	if (!head) return head;
	let th = new ListNode(-1);
	th.next = head;
	let fast = th,
		slow = th;

	while (n--) {
		fast = fast.next;
	}
	while (fast && fast.next) {
		fast = fast.next;
		slow = slow.next;
	}
	if (slow && slow.next) {
		slow.next = slow.next.next;
	}

	return th.next;
}

// @lc code=end
