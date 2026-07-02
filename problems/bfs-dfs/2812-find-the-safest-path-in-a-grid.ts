/**
 * LeetCode #2812 - 找出最安全路径
 * 难度: Medium | 分类: bfs-dfs
 * 链接: https://leetcode.cn/problems/find-the-safest-path-in-a-grid/
 * 完成: 2026-07-02 | ❌ 非一次通过
 *
 * 第一思路 / 卡壳原因:
 *   第一步暴力算距离 O(n⁴) 超时，需多源 BFS O(n²)；第二步未识别出'最大化最小值=二分答案'模式（见 pitfalls #2）
 *
 * 解法: 多源 BFS 建距离矩阵 + 二分答案 + BFS 验证连通性
 * 复杂度: O(n² log n) 时间, O(n²) 空间
 * Runtime: 1089ms | Memory: 93.9MB
 */

function maximumSafenessFactor(grid: number[][]): number {
    const n = grid.length;
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    const dist: number[][] = Array.from({length: n}, () => new Array(n).fill(-1));
    const queue: [number, number][] = [];
    for (let r = 0; r < n; r++)
        for (let c = 0; c < n; c++)
            if (grid[r][c] === 1) { dist[r][c] = 0; queue.push([r, c]); }
    let qi = 0;
    while (qi < queue.length) {
        const [r, c] = queue[qi++];
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && dist[nr][nc] === -1) {
                dist[nr][nc] = dist[r][c] + 1;
                queue.push([nr, nc]);
            }
        }
    }
    if (dist[0][0] === 0 || dist[n-1][n-1] === 0) return 0;
    const canReach = (mid: number): boolean => {
        if (dist[0][0] < mid || dist[n-1][n-1] < mid) return false;
        const vis = Array.from({length: n}, () => new Array(n).fill(false));
        const q: [number, number][] = [[0, 0]];
        vis[0][0] = true;
        let i = 0;
        while (i < q.length) {
            const [r, c] = q[i++];
            if (r === n-1 && c === n-1) return true;
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !vis[nr][nc] && dist[nr][nc] >= mid) {
                    vis[nr][nc] = true;
                    q.push([nr, nc]);
                }
            }
        }
        return false;
    };
    let lo = 0, hi = n + n - 2;
    while (lo < hi) {
        const mid = (lo + hi + 1) >> 1;
        if (canReach(mid)) lo = mid;
        else hi = mid - 1;
    }
    return lo;
}
