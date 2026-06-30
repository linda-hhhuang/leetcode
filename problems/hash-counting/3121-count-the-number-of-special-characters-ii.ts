/**
 * LeetCode #3121 - 统计特殊字母的数量 II
 * 难度: Medium | 分类: hash-counting
 * 链接: https://leetcode.cn/problems/count-the-number-of-special-characters-ii/
 * 完成: 2026-05-28 | ❌ 非一次通过
 *
 * 第一思路 / 卡壳原因:
 *   状态机转移设计遗漏：state=2 后遇大写应保持、遇小写应非法，初版未覆盖（见 pitfalls #1）
 *
 * 解法: 状态机：单数组 state[26]，4 态 (0/1/2/-1) 单遍扫描
 * 复杂度: O(n) 时间, O(1) 空间
 * Runtime: 23ms | Memory: 63.6MB
 */

function numberOfSpecialChars(word: string): number {
    const state = new Array(26).fill(0);
    for (const ch of word) {
        const code = ch.charCodeAt(0);
        if (code >= 97) {
            const k = code - 97;
            if (state[k] === 0) state[k] = 1;
            else if (state[k] === 2) state[k] = -1;
        } else {
            const k = code - 65;
            if (state[k] === 1) state[k] = 2;
            else if (state[k] === 0) state[k] = -1;
        }
    }
    let count = 0;
    for (let i = 0; i < 26; i++) {
        if (state[i] === 2) count++;
    }
    return count;
}
