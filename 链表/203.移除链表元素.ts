/*
 * @lc app=leetcode.cn id=203 lang=typescript
 *
 * [203] 移除链表元素
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

// 测试用例

// class ListNode {
// 	val: number;
// 	next: ListNode | null;
// 	constructor(val?: number, next?: ListNode | null) {
// 		this.val = val === undefined ? 0 : val;
// 		this.next = next === undefined ? null : next;
// 	}
// }
// const test = () => {
// 	const head = new ListNode(7);
// 	let curr = head;
// 	[7, 7, 7, 7, 7].forEach((val) => {
// 		curr.next = new ListNode(val);
// 		curr = curr.next;
// 	});

// 	// 移除值为6的节点
// 	const result = removeElements(head, 7);

// 	// 验证结果应该是1->2->3->4->5
// 	let verify = result;
// 	while (verify) {
// 		console.log(verify.val);
// 		verify = verify.next;
// 	}
// };

// test();

// @lc code=end
