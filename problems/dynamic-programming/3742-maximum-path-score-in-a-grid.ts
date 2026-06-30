/**
 * LeetCode #3742 - 网格中得分最大的路径
 * 难度: Medium | 分类: dynamic-programming
 * 链接: https://leetcode.cn/problems/maximum-path-score-in-a-grid/
 * 完成: 2026-05-17 | ❌ 非一次通过
 *
 * 第一思路 / 卡壳原因:
 *   初版贪心思路有 loss（漏算），改为 3D DP；滚动数组优化时 c 需从大到小遍历避免覆盖
 *
 * 解法: 3D DP dp[i][j][c] 滚动数组优化为 dp[j][c]，c从大到小遍历
 * 复杂度: O(m×n×k) 时间, O(n×k) 空间
 * Runtime: 366ms | Memory: 66.5MB
 */

function maxPathScore(grid: number[][], k: number): number {
    const m = grid.length;
    const n = grid[0].length;

    const dp: number[][] = Array.from({ length: n }, () => new Array(k + 1).fill(-1));
    dp[0][0] = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;

            const cost = grid[i][j] === 0 ? 0 : 1;
            const score = grid[i][j];

            for (let c = k; c >= cost; c--) {
                const above = dp[j][c - cost];
                const left = j > 0 ? dp[j - 1][c - cost] : -1;

                let best = -1;
                if (above > best) best = above;
                if (left > best) best = left;

                dp[j][c] = best === -1 ? -1 : best + score;
            }

            for (let c = 0; c < cost; c++) {
                dp[j][c] = -1;
            }
        }
    }

    let ans = -1;
    for (let c = 0; c <= k; c++) {
        if (dp[n - 1][c] > ans) ans = dp[n - 1][c];
    }
    return ans;
}
