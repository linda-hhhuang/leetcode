/**
 * LeetCode #704 - 二分查找
 * 难度: Easy | 分类: binary-search
 * 链接: https://leetcode.cn/problems/binary-search/
 * 来源: legacy（历史题，早期手刷）
 */

function search(nums: number[], target: number): number {
	if (nums.length === 0) return -1;
	let left = 0,
		right = nums.length - 1;

	if (nums[left] === target) return left;
	if (nums[right] === target) return right;
	let mid = Math.floor((left + right) / 2);
	while (mid !== left && mid !== right) {
		if (nums[mid] === target) return mid;
		if (nums[mid] > target) right = mid;
		if (nums[mid] < target) left = mid;
		mid = Math.floor((left + right) / 2);
	}
	return -1;
}
