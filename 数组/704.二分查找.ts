/*
 * @lc app=leetcode.cn id=704 lang=typescript
 *
 * [704] 二分查找
 */

// @lc code=start
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

console.log(search([-1, 0, 3, 5, 9, 12], 9));
// @lc code=end

/**  
 * 
 */