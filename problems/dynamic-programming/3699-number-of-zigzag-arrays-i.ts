/**
 * LeetCode #3699 - 锯齿形数组的总数 I
 * 难度: Hard | 分类: dynamic-programming
 * 链接: https://leetcode.cn/problems/number-of-zigzag-arrays-i/
 * 完成: 2026-06-29 | ❌ 非一次通过
 *
 * 第一思路 / 卡壳原因:
 *   手推递推公式时第二项内层求和上界笔误（写成 p-1 应为 i-1），讨论后修正；自己发现对称性优化
 *
 * 解法: DP 双状态 up/down + 前缀和；利用对称性 up[v]=down[k-1-v] 只维护一个数组，计算量减半
 * 复杂度: O(n×k) 时间, O(k) 空间
 * Runtime: 563ms | Memory: 62.3MB
 */

function zigZagArrays(n: number, l: number, r: number): number {
    const MOD = 1000000007;
    const k = r - l + 1;
    let down = new Array(k).fill(1);
    for (let step = 2; step <= n; step++) {
        const prefix = new Array(k + 1).fill(0);
        for (let i = 0; i < k; i++) prefix[i + 1] = (prefix[i] + down[i]) % MOD;
        const nd = new Array(k).fill(0);
        for (let w = 0; w < k; w++) nd[w] = prefix[k - 1 - w];
        down = nd;
    }
    let half = 0;
    for (let v = 0; v < k; v++) half = (half + down[v]) % MOD;
    return (half * 2) % MOD;
}
