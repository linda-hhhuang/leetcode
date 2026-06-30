/**
 * LeetCode #203 - 移除链表元素
 * 难度: Easy | 分类: linked-list
 * 链接: https://leetcode.cn/problems/remove-linked-list-elements/
 * 来源: legacy（历史题，早期手刷）
 */

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
function removeElements(head: ListNode | null, val: number): ListNode | null {
	while (head && head.val === val) head = head.next;
	if (!head || !head.next) return head;
	let prev = head,
		curr = head.next;
	while (curr) {
		if (curr.val === val && prev) {
			prev.next = curr.next;
		} else {
			prev = curr;
		}
		curr = curr.next;
	}
	return head;
}
