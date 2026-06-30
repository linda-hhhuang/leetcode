/**
 * LeetCode #1306 - 跳跃游戏 III
 * 难度: Medium | 分类: bfs-dfs
 * 链接: https://leetcode.cn/problems/jump-game-iii/
 * 完成: 2026-05-19 | ✅ 一次通过
 *
 * 第一思路 / 卡壳原因:
 *   标准 BFS 可达性，一次过
 *
 * 解法: 正向 BFS + 原地标记 visited（arr[i]=-1）
 * 复杂度: O(n) 时间, O(n) 空间
 * Runtime: 2ms | Memory: 59.4MB
 */

function canReach(arr: number[], start: number): boolean {
    const n = arr.length;
    const queue: number[] = [start];

    while (queue.length > 0) {
        const i = queue.pop()!;
        if (arr[i] === 0) return true;
        if (arr[i] < 0) continue;

        const step = arr[i];
        arr[i] = -1;

        if (i + step < n) queue.push(i + step);
        if (i - step >= 0) queue.push(i - step);
    }

    return false;
}
