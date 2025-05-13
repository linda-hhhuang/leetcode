/*
 * @lc app=leetcode.cn id=977 lang=typescript
 *
 * [977] 有序数组的平方
 */

// @lc code=start
function sortedSquares(nums: number[]): number[] {
	// if (nums.length === 0) return [];
	// let right = nums.findIndex((i) => i >= 0);
	// let left = right === -1 ? nums.length - 1 : right - 1;
	// let result: number[] = [];
	// while (left >= 0 || (right < nums.length && right !== -1)) {
	// 	const lv = left >= 0 ? nums[left] * nums[left] : Infinity;
	// 	const rv =
	// 		right < nums.length && right !== -1
	// 			? nums[right] * nums[right]
	// 			: Infinity;
	// 	if (lv <= rv) {
	// 		result.push(lv);
	// 		left--;
	// 	} else {
	// 		result.push(rv);
	// 		right++;
	// 	}
	// }
	// return result;

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

// console.log(sortedSquares([-4, -1, 0, 3, 10]));
// @lc code=end
