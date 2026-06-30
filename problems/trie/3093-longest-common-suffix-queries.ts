/**
 * LeetCode #3093 - 最长公共后缀查询
 * 难度: Hard | 分类: trie
 * 链接: https://leetcode.cn/problems/longest-common-suffix-queries/
 * 完成: 2026-06-22 | ✅ 一次通过
 *
 * 第一思路 / 卡壳原因:
 *   复用 #3043 前缀 Trie 经验，识别出后缀=反转前缀，一次过
 *
 * 解法: 反向 Trie：wordsContainer 从尾到头逐字符插入 Trie，每个节点维护 bestIdx（最短+最小下标），查询时反向走 query
 * 复杂度: O(总字符数) 时间, O(总字符数) 空间
 * Runtime: 1477ms | Memory: 206.3MB
 */

function stringIndices(wordsContainer: string[], wordsQuery: string[]): number[] {
    const root: [Map<number, any>, number] = [new Map(), 0];

    let globalBest = 0;
    for (let i = 1; i < wordsContainer.length; i++) {
        if (wordsContainer[i].length < wordsContainer[globalBest].length) {
            globalBest = i;
        }
    }
    root[1] = globalBest;

    for (let i = 0; i < wordsContainer.length; i++) {
        const w = wordsContainer[i];
        let node = root;
        for (let j = w.length - 1; j >= 0; j--) {
            const c = w.charCodeAt(j) - 97;
            if (!node[0].has(c)) {
                node[0].set(c, [new Map(), i]);
            }
            node = node[0].get(c)!;
            const curBest = node[1];
            if (wordsContainer[i].length < wordsContainer[curBest].length ||
                (wordsContainer[i].length === wordsContainer[curBest].length && i < curBest)) {
                node[1] = i;
            }
        }
    }

    const ans: number[] = [];
    for (const q of wordsQuery) {
        let node = root;
        let best = root[1];
        for (let j = q.length - 1; j >= 0; j--) {
            const c = q.charCodeAt(j) - 97;
            if (!node[0].has(c)) break;
            node = node[0].get(c)!;
            best = node[1];
        }
        ans.push(best);
    }

    return ans;
}
