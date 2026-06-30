/**
 * LeetCode #27 - 移除元素
 * 难度: Easy | 分类: array-two-pointers
 * 链接: https://leetcode.cn/problems/remove-element/
 * 来源: legacy（历史题，早期手刷）
 */

/**
 * 写一个快慢的,不用想太复杂，快的固定每次走一步，命中则快速走不管慢的，不然就每次快赋值给慢的即可
 */
function removeElement(nums: number[], val: number): number {
	let slow = 0,
		fast = 0,
		k = 0;

	while (fast < nums.length) {
		if (nums[fast] === val) {
			k++;
			fast++;
			continue;
		}

		nums[slow] = nums[fast];
		fast++;
		slow++;

	}
	return nums.length - k;
}
