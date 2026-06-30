/**
 * LeetCode #3043 - 最长公共前缀的长度
 * 难度: Medium | 分类: trie
 * 链接: https://leetcode.cn/problems/find-the-length-of-the-longest-common-prefix/
 * 完成: 2026-05-26 | ✅ 一次通过
 *
 * 第一思路 / 卡壳原因:
 *   独立想到用 Trie 存所有前缀，一次过
 *
 * 解法: Trie 字典树：arr1 按位构建 Trie（Map children），arr2 逐位查询最大深度
 * 复杂度: O((n1+n2)×L) 时间, O(n1×L) 空间, L≤9
 * Runtime: 187ms | Memory: 85.9MB
 */

function longestCommonPrefix(arr1: number[], arr2: number[]): number {
    const root: Map<number, any> = new Map();
    for (const num of arr1) {
        const digits = String(num);
        let node = root;
        for (const ch of digits) {
            const d = Number(ch);
            if (!node.has(d)) {
                node.set(d, new Map());
            }
            node = node.get(d)!;
        }
    }
    let ans = 0;
    for (const num of arr2) {
        const digits = String(num);
        let node = root;
        let depth = 0;
        for (const ch of digits) {
            const d = Number(ch);
            if (!node.has(d)) break;
            node = node.get(d)!;
            depth++;
        }
        ans = Math.max(ans, depth);
    }
    return ans;
}
