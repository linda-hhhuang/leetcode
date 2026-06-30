/**
 * LeetCode #1861 - 旋转盒子
 * 难度: Medium | 分类: simulation
 * 链接: https://leetcode.cn/problems/rotating-the-box/
 * 完成: 2026-05-14 | ✅ 一次通过
 *
 * 第一思路 / 卡壳原因:
 *   用 k 计数器单趟模拟石头下落，再旋转，一次过
 *
 * 解法: 单趟重力模拟（k计数器swap）+ 顺时针旋转
 * 复杂度: O(m×n)
 * Runtime: 16ms | Memory: 80.1MB
 */

function rotateTheBox(boxGrid: string[][]): string[][] {
    const m = boxGrid.length;
    const n = boxGrid[0].length;

    for (let r = 0; r < m; r++) {
        let k = 0;
        for (let x = 0; x < n; x++) {
            if (boxGrid[r][x] === "*") {
                k = 0;
            } else if (boxGrid[r][x] === ".") {
                if (k > 0) {
                    boxGrid[r][x] = "#";
                    boxGrid[r][x - k] = ".";
                }
            } else {
                k++;
            }
        }
    }

    const res: string[][] = Array.from({ length: n }, () => new Array(m));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            res[i][j] = boxGrid[m - 1 - j][i];
        }
    }

    return res;
}
