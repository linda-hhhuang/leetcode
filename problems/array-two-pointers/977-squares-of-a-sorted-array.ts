/**
 * LeetCode #977 - 有序数组的平方
 * 难度: Easy | 分类: array-two-pointers
 * 链接: https://leetcode.cn/problems/squares-of-a-sorted-array/
 * 来源: legacy（历史题，早期手刷）
 */

function sortedSquares(nums: number[]): number[] {
	// 上面这是从里面往外找，会慢一点点，可以从外面往里面会简单很多很多
	// 外往里
	let left = 0,
		right = nums.length - 1,
		i = nums.length - 1;
	const result: number[] = new Array(nums.length).fill(0);
	while (left <= right) {
		const lv = nums[left] * nums[left];
		const rv = nums[right] * nums[right];

		if (lv >= rv) {
			result[i--] = lv;
			left++;
		} else {
			result[i--] = rv;
			right--;
		}
	}
	return result;
}
