/*
 * @lc app=leetcode.cn id=27 lang=typescript
 *
 * [27] 移除元素
 */

/**
 * 用了前后的双指针，但是会覆盖原先数组顺序，如果要不改变顺序，应该设置快慢指针，
 */
// @lc code=start
function removeElementV1(nums: number[], val: number): number {
	let left = 0,
		right = nums.length - 1,
		k = 0;
	const sw = (a, b, n) => {
		const c = n[a];
		n[a] = n[b];
		n[b] = c;
	};
	while (left <= right) {
		if (nums[left] === val && nums[right] !== val) {
			k++;
			sw(left, right, nums);
			left++;
			right--;
		} else if (nums[left] !== val && nums[right] === val) {
			k++;
			left++;
			right--;
		} else if (nums[left] === val && nums[right] === val) {
			k++;
			right--;
		} else {
			left++;
		}
		// console.log(nums, left, right, k);
	}
	return nums.length - k;
}

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
			// console.log("end,", nums, slow, fast, k);
			continue;
		}

		nums[slow] = nums[fast];
		fast++;
		slow++;

		// console.log("end,", nums, slow, fast, k);
	}
	return nums.length - k;
}

// removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2);
// @lc code=end
