/**
 * LeetCode #206 - 反转链表
 * 难度: Easy | 分类: linked-list
 * 链接: https://leetcode.cn/problems/reverse-linked-list/
 * 来源: legacy（历史题，早期手刷）
 */

/**
 * Definition for singly-linked list.
 class ListNode {
     val: number
     next: ListNode | null
     constructor(val?: number, next?: ListNode | null) {
         this.val = (val===undefined ? 0 : val)
         this.next = (next===undefined ? null : next)
     }
 }
 */
function reverseList(head: ListNode | null): ListNode | null {
	if (!head || !head.next) return head;
	let curr = head.next,
		prev = head;
	prev.next = null;
	while (curr) {
		let next = curr.next;
		curr.next = prev;
		prev = curr;
		curr = next;
	}
	return prev;
}
