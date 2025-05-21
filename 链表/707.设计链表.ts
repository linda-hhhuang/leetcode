/*
 * @lc app=leetcode.cn id=707 lang=typescript
 *
 * [707] 设计链表
 */


// @lc code=start
class MyLinkedList {
	nodeList: ListNode | undefined;
	tailNode: ListNode | undefined;
	length: number | undefined;
	constructor() {
		this.nodeList = undefined;
		this.tailNode = undefined;
		this.length = 0;
	}

	get(index: number): number {
		if (index < 0 || index >= this.length) return -1;
		if (index === 0) return this.nodeList ? this.nodeList.val : -1;
		let node = this.nodeList;
		while (index-- && node) {
			node = node.next;
		}

		return node.val ?? -1;
	}

	getPrev(index: number): ListNode {
		if (index <= 0 || index >= this.length) return undefined;
		let node = this.nodeList;
		while (--index) {
			node = node.next;
		}
		return node;
	}
	addAtHead(val: number): void {
		const newNode = new ListNode(val);
		newNode.next = this.nodeList;

		if (!this.nodeList) this.tailNode = newNode;
		this.nodeList = newNode;

		this.length++;
	}

	addAtTail(val: number): void {
		const newNode = new ListNode(val);
		newNode.next = undefined;

		if (!this.tailNode) {
			this.nodeList = newNode;
		} else {
			this.tailNode.next = newNode;
		}
		this.tailNode = newNode;
		this.length++;
	}

	addAtIndex(index: number, val: number): void {
		if (index === this.length) {
			this.addAtTail(val);
		} else if (index > this.length) {
			return;
		} else if (index === 0) {
			this.addAtHead(val);
		} else {
			let prev = this.getPrev(index);
			if (prev) {
				let next = prev.next;
				const newNode = new ListNode(val);
				newNode.next = next;
				prev.next = newNode;
				this.length++;
			}
		}
	}

	deleteAtIndex(index: number): void {
		if (index < 0 || index >= this.length) {
			return;
		} else if (index === 0) {
			this.nodeList = this.nodeList.next;
		} else {
			let prev = this.getPrev(index);
			if (prev) {
				let next = prev.next.next;
				prev.next = next;
				if (index === this.length - 1) {
					this.tailNode = prev;
				}
			}
		}
		this.length--;
	}
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
// @lc code=end


// var obj = new MyLinkedList();
// obj.addAtHead(1);
// obj.addAtTail(3);
// console.log(obj, "###");
// obj.addAtIndex(1, 2);
// console.log(obj);
// obj.get(1);
// obj.deleteAtIndex(1);
// obj.get(1);
