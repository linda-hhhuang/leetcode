# 🧗 我的 LeetCode 刷题之旅

> 每日一题 · 讨论式学习 · 思路沉淀。代码按算法类型分类，附第一思路与卡壳复盘。

## 📊 总览

![Total](https://img.shields.io/badge/Total-11-6366f1) ![Easy](https://img.shields.io/badge/Easy-2-00af9b) ![Medium](https://img.shields.io/badge/Medium-6-ffb800) ![Hard](https://img.shields.io/badge/Hard-3-ef4743) ![一次通过率](https://img.shields.io/badge/一次通过率-73%25-00af9b)

- **总完成**：11 题
- **活跃做题日**：10 天
- **难度分布**：Easy 2 / Medium 6 / Hard 3
- **一次通过率**：73%（8/11）

> 📈 可视化大盘见 [dashboard.html](dashboard.html)（本地打开查看热力图）

## 🗂 目录结构

```
problems/<算法分类>/<题号>-<slug>.ts   # 代码（含注释头：思路/是否一次过/复杂度）
solutions/<题号>.md                    # 详细题解
pitfalls.md                            # 思路缺陷复盘记录
progress.json                          # 结构化进度数据（单一数据源）
dashboard.html                         # 做题大盘可视化
scripts/                               # 生成脚本
```

## 📚 题目清单（按算法分类）

### dynamic-programming (2)

| 题号 | 标题 | 难度 | 一次过 | 解法 |
|---|---|---|:---:|---|
| [#3699](https://leetcode.cn/problems/number-of-zigzag-arrays-i/) | [锯齿形数组的总数 I](problems/dynamic-programming/3699-number-of-zigzag-arrays-i.ts) | Hard | 🔁 | DP 双状态 up/down + 前缀和；利用对称性 up[v]=down[k-… |
| [#3742](https://leetcode.cn/problems/maximum-path-score-in-a-grid/) | [网格中得分最大的路径](problems/dynamic-programming/3742-maximum-path-score-in-a-grid.ts) | Medium | 🔁 | 3D DP dp[i][j][c] 滚动数组优化为 dp[j][c]，c从大到小… |

### trie (2)

| 题号 | 标题 | 难度 | 一次过 | 解法 |
|---|---|---|:---:|---|
| [#3043](https://leetcode.cn/problems/find-the-length-of-the-longest-common-prefix/) | [最长公共前缀的长度](problems/trie/3043-find-the-length-of-the-longest-common-prefix.ts) | Medium | ✅ | Trie 字典树：arr1 按位构建 Trie（Map children），ar… |
| [#3093](https://leetcode.cn/problems/longest-common-suffix-queries/) | [最长公共后缀查询](problems/trie/3093-longest-common-suffix-queries.ts) | Hard | ✅ | 反向 Trie：wordsContainer 从尾到头逐字符插入 Trie，每个… |

### simulation (2)

| 题号 | 标题 | 难度 | 一次过 | 解法 |
|---|---|---|:---:|---|
| [#1861](https://leetcode.cn/problems/rotating-the-box/) | [旋转盒子](problems/simulation/1861-rotating-the-box.ts) | Medium | ✅ | 单趟重力模拟（k计数器swap）+ 顺时针旋转 |
| [#3300](https://leetcode.cn/problems/minimum-element-after-replacement-with-digit-sum/) | [替换为数位和以后的最小元素](problems/simulation/3300-minimum-element-after-replacement-with-digit-sum.ts) | Easy | ✅ | 遍历求每个数各位之和，取 min |

### hash-counting (2)

| 题号 | 标题 | 难度 | 一次过 | 解法 |
|---|---|---|:---:|---|
| [#3120](https://leetcode.cn/problems/count-the-number-of-special-characters-i/) | [统计特殊字母的数量 I](problems/hash-counting/3120-count-the-number-of-special-characters-i.ts) | Easy | ✅ | 双数组 low[26]/up[26] 标记出现，最后统计同时为 1 的位 |
| [#3121](https://leetcode.cn/problems/count-the-number-of-special-characters-ii/) | [统计特殊字母的数量 II](problems/hash-counting/3121-count-the-number-of-special-characters-ii.ts) | Medium | 🔁 | 状态机：单数组 state[26]，4 态 (0/1/2/-1) 单遍扫描 |

### sliding-window (1)

| 题号 | 标题 | 难度 | 一次过 | 解法 |
|---|---|---|:---:|---|
| [#1358](https://leetcode.cn/problems/number-of-substrings-containing-all-three-characters/) | [包含所有三种字符的子字符串数目](problems/sliding-window/1358-number-of-substrings-containing-all-three-characters.ts) | Medium | ✅ | 滑动窗口：固定 right，尽量右移 left 到刚好不合法，以 right 结… |

### bfs-dfs (1)

| 题号 | 标题 | 难度 | 一次过 | 解法 |
|---|---|---|:---:|---|
| [#1306](https://leetcode.cn/problems/jump-game-iii/) | [跳跃游戏 III](problems/bfs-dfs/1306-jump-game-iii.ts) | Medium | ✅ | 正向 BFS + 原地标记 visited（arr[i]=-1） |

### greedy (1)

| 题号 | 标题 | 难度 | 一次过 | 解法 |
|---|---|---|:---:|---|
| [#1665](https://leetcode.cn/problems/minimum-initial-energy-to-finish-tasks/) | [完成所有任务的最少初始能量](problems/greedy/1665-minimum-initial-energy-to-finish-tasks.ts) | Hard | ✅ | 贪心排序（按 minimum-actual 降序）+ 反向 DP |

---

## 🔧 维护

```bash
node scripts/generate-code-files.js   # 从 progress.json + solutions 生成代码文件
node scripts/generate-dashboard.js    # 生成 dashboard.html
node scripts/generate-readme.js       # 生成本 README
node scripts/build.js                 # 一键全部生成
```

_本 README 由脚本自动生成，请勿手动编辑。_
