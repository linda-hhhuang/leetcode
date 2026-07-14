/**
 * LeetCode #3620 - 网络恢复路径
 * 难度: Hard | 分类: bfs-dfs
 * 链接: https://leetcode.cn/problems/network-recovery-pathways/
 * 完成: 2026-07-14 | ❌ 非一次通过
 *
 * 第一思路 / 卡壳原因:
 *   初始想暴力枚举路径（指数级），需要认出两个模式：1.多约束下'最大化最小值'=二分答案 2.DAG最短路=拓扑排序+松弛 O(n+m)。也复习了拓扑排序和松弛概念
 *
 * 解法: 二分答案 + DAG 拓扑排序最短路：二分 score 下限 mid，过滤 cost<mid 的边，拓扑排序+松弛求最短路判 ≤k
 * 复杂度: O((n+m) log m) 时间, O(n+m) 空间
 * Runtime: 1482ms | Memory: 127.7MB
 */

function findMaxPathScore(edges: number[][], online: boolean[], k: number): number {
    const n = online.length;
    const validEdges: [number, number, number][] = [];
    for (const [u, v, cost] of edges) {
        if (!online[u] || !online[v]) continue;
        if (cost > k) continue;
        validEdges.push([u, v, cost]);
    }
    const costs = [...new Set(validEdges.map(e => e[2]))].sort((a, b) => a - b);
    if (costs.length === 0) return -1;

    function canAchieve(mid: number): boolean {
        const adj: [number, number][][] = Array.from({length: n}, () => []);
        const inDeg = new Array(n).fill(0);
        for (const [u, v, cost] of validEdges) {
            if (cost >= mid) { adj[u].push([v, cost]); inDeg[v]++; }
        }
        const queue: number[] = [];
        for (let i = 0; i < n; i++) if (inDeg[i] === 0) queue.push(i);
        const order: number[] = [];
        let qi = 0;
        while (qi < queue.length) {
            const u = queue[qi++]; order.push(u);
            for (const [v] of adj[u]) { if (--inDeg[v] === 0) queue.push(v); }
        }
        const dist = new Array(n).fill(Infinity);
        dist[0] = 0;
        for (const u of order) {
            if (dist[u] === Infinity) continue;
            for (const [v, w] of adj[u]) {
                if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
            }
        }
        return dist[n - 1] <= k;
    }

    let lo = 0, hi = costs.length - 1;
    if (!canAchieve(costs[0])) return -1;
    while (lo < hi) {
        const mid = (lo + hi + 1) >> 1;
        if (canAchieve(costs[mid])) lo = mid;
        else hi = mid - 1;
    }
    return costs[lo];
}
