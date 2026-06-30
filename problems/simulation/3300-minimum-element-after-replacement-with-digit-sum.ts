/**
 * LeetCode #3300 - 替换为数位和以后的最小元素
 * 难度: Easy | 分类: simulation
 * 链接: https://leetcode.cn/problems/minimum-element-after-replacement-with-digit-sum/
 * 完成: 2026-05-29 | ✅ 一次通过
 *
 * 第一思路 / 卡壳原因:
 *   送分题，一次过
 *
 * 解法: 遍历求每个数各位之和，取 min
 * 复杂度: O(n×L) 时间, O(1) 空间
 * Runtime: 2ms | Memory: 58.2MB
 */

function minElement(nums: number[]): number {
    let min = Infinity;
    for (const n of nums) {
        let s = 0, x = n;
        while (x > 0) { s += x % 10; x = Math.floor(x / 10); }
        if (s < min) min = s;
    }
    return min;
}
