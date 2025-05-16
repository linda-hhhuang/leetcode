/*
 * @lc app=leetcode.cn id=24 lang=typescript
 *
 * [24] 两两交换链表中的节点
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

// 1234->2143
function swapPairs(head: ListNode | null): ListNode | null {
	if (!head || !head.next) return head;
	let curr = head,
		prev = head;
	while (1) {
		let n1 = curr;
		let n2 = curr.next;
		n1.next = n2.next;
		n2.next = n1;

		if (n1 === head) {
			head = n2;
		} else {
			prev.next = n2;
		}
		prev = n1;

		let n3 = n1.next;
		if (!n3 || !n3.next) {
			break;
		} else {
			curr = n3;
		}
	}
	return head;
}
// @lc code=end
