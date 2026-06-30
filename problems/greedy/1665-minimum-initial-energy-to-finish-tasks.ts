/**
 * LeetCode #1665 - 完成所有任务的最少初始能量
 * 难度: Hard | 分类: greedy
 * 链接: https://leetcode.cn/problems/minimum-initial-energy-to-finish-tasks/
 * 完成: 2026-05-13 | ✅ 一次通过
 *
 * 第一思路 / 卡壳原因:
 *   贪心排序策略：按 (minimum - actual) 降序，一次过
 *
 * 解法: 贪心排序（按 minimum-actual 降序）+ 反向 DP
 * 复杂度: O(n log n)
 * Runtime: 32ms | Memory: 85.3MB
 */

function minimumEffort(tasks: number[][]): number {
    tasks.sort((a, b) => (b[1] - b[0]) - (a[1] - a[0]));

    const n = tasks.length;
    let m = tasks[n - 1][1];
    for (let i = n - 2; i >= 0; i--) {
        m = Math.max(tasks[i][1], tasks[i][0] + m);
    }

    return m;
}
