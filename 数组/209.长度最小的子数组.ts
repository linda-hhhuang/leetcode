/*
 * @lc app=leetcode.cn id=209 lang=typescript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start
function minSubArrayLen(target: number, nums: number[]): number {
	let left = 0,
		result = Infinity,
		tempSum = 0;
	const n = nums.length;
	for (let right = 0; right < n; right++) {
		tempSum += nums[right];
		if (tempSum >= target) {
			while (1) {
				const t = tempSum - nums[left];
				if (t >= target) {
					tempSum = t;
					left++;
				} else break;
			}
			result = Math.min(result, right - left + 1);
		}
	}
	return result === Infinity ? 0 : result;
}
// @lc code=end
