/**
 * LeetCode #1358 - 包含所有三种字符的子字符串数目
 * 难度: Medium | 分类: sliding-window
 * 链接: https://leetcode.cn/problems/number-of-substrings-containing-all-three-characters/
 * 完成: 2026-06-30 | ✅ 一次通过
 *
 * 第一思路 / 卡壳原因:
 *   独立推出正确滑窗思路（按 left 累加版），一次过
 *
 * 解法: 滑动窗口：固定 right，尽量右移 left 到刚好不合法，以 right 结尾的合法子串数 = left，累加
 * 复杂度: O(n) 时间, O(1) 空间
 * Runtime: 11ms | Memory: 57.2MB
 */

function numberOfSubstrings(s: string): number {
    const cnt = [0, 0, 0];
    let left = 0, result = 0;
    for (let right = 0; right < s.length; right++) {
        cnt[s.charCodeAt(right) - 97]++;
        while (cnt[0] > 0 && cnt[1] > 0 && cnt[2] > 0) {
            cnt[s.charCodeAt(left) - 97]--;
            left++;
        }
        result += left;
    }
    return result;
}
