/**
 * LeetCode #3120 - 统计特殊字母的数量 I
 * 难度: Easy | 分类: hash-counting
 * 链接: https://leetcode.cn/problems/count-the-number-of-special-characters-i/
 * 完成: 2026-05-26 | ✅ 一次通过
 *
 * 第一思路 / 卡壳原因:
 *   送分题，一次过
 *
 * 解法: 双数组 low[26]/up[26] 标记出现，最后统计同时为 1 的位
 * 复杂度: O(n) 时间, O(1) 空间
 * Runtime: 3ms | Memory: 58.8MB
 */

function numberOfSpecialChars(word: string): number {
    const low = new Array(26).fill(0);
    const up = new Array(26).fill(0);
    for (const x of word) {
        const code = x.charCodeAt(0);
        const kLow = code - 97;
        const kUp = code - 65;
        if (kLow >= 0 && kLow <= 25) low[kLow] = 1;
        if (kUp >= 0 && kUp <= 25) up[kUp] = 1;
    }
    let sum = 0;
    for (let i = 0; i < 26; i++) {
        sum += (up[i] && low[i]) ? 1 : 0;
    }
    return sum;
}
