# 🧗 我的 LeetCode 刷题之旅

> 每日一题 · 讨论式学习 · 思路沉淀。代码按算法类型分类，附第一思路与卡壳复盘。

## 📊 总览

![Total](https://img.shields.io/badge/Total-25-6366f1) ![Easy](https://img.shields.io/badge/Easy-9-00af9b) ![Medium](https://img.shields.io/badge/Medium-13-ffb800) ![Hard](https://img.shields.io/badge/Hard-3-ef4743) ![一次通过率](https://img.shields.io/badge/一次通过率-67%25-00af9b)

- **总完成**：25 题（含 13 道早期手刷历史题）
- **每日一题活跃日**：11 天
- **难度分布**：Easy 9 / Medium 13 / Hard 3
- **一次通过率**：67%（8/12，仅统计每日一题）

> 📈 可视化大盘见 [dashboard.html](dashboard.html)（本地打开查看热力图）
> 🏷 标记说明：✅ 一次通过 · 🔁 非一次通过 · — 历史题无记录

## 🗂 目录结构

```
problems/<算法分类>/<题号>-<slug>.ts   # 代码（含注释头：思路/是否一次过/复杂度）
solutions/<题号>.md                    # 详细题解
kamacoder/                             # 卡码网题（不计入 LeetCode 统计）
meta/                                  # 系统元数据（可一键复原）
├── RESTORE.md                         #   ⭐ 复原说明书：换模型/工具也能续上
├── progress.json                      #   单一数据源（队列+完成记录+规则）
├── SKILL-leetcode-daily.md            #   完整 skill 文档（含 API 细节）
└── pitfalls.md                        #   思路缺陷复盘记录
dashboard.html                         # 做题大盘可视化
scripts/                               # 生成脚本
```

> 🔄 **想换 AI/工具继续做题？** 让新助手读 [meta/RESTORE.md](meta/RESTORE.md) 即可一键复原整套系统。


## 📚 题目清单（按算法分类）

### linked-list (7)

| 题号 | 标题 | 难度 | 一次过 | 解法 |
|---|---|---|:---:|---|
| [#19](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/) | [删除链表的倒数第 N 个结点](problems/linked-list/19-remove-nth-node-from-end-of-list.ts) | Medium | — | 虚拟头 + 快慢指针 |
| [#24](https://leetcode.cn/problems/swap-nodes-in-pairs/) | [两两交换链表中的节点](problems/linked-list/24-swap-nodes-in-pairs.ts) | Medium | — | 迭代两两断链重连 |
| [#142](https://leetcode.cn/problems/linked-list-cycle-ii/) | [环形链表 II](problems/linked-list/142-linked-list-cycle-ii.ts) | Medium | — | 快慢指针找相遇点，再从头同步走找环入口 |
| [#160](https://leetcode.cn/problems/intersection-of-two-linked-lists/) | [相交链表](problems/linked-list/160-intersection-of-two-linked-lists.ts) | Easy | — | 对齐长度差后并行遍历 |
| [#203](https://leetcode.cn/problems/remove-linked-list-elements/) | [移除链表元素](problems/linked-list/203-remove-linked-list-elements.ts) | Easy | — | 跳过头部等值节点 + prev/curr 遍历删除 |
| [#206](https://leetcode.cn/problems/reverse-linked-list/) | [反转链表](problems/linked-list/206-reverse-linked-list.ts) | Easy | — | 迭代三指针就地反转 |
| [#707](https://leetcode.cn/problems/design-linked-list/) | [设计链表](problems/linked-list/707-design-linked-list.ts) | Medium | — | 维护头尾指针 + 长度的单链表类 |

### simulation (3)

| 题号 | 标题 | 难度 | 一次过 | 解法 |
|---|---|---|:---:|---|
| [#59](https://leetcode.cn/problems/spiral-matrix-ii/) | [螺旋矩阵 II](problems/simulation/59-spiral-matrix-ii.ts) | Medium | — | 方向枚举 + 模拟移动逐格填数 |
| [#1861](https://leetcode.cn/problems/rotating-the-box/) | [旋转盒子](problems/simulation/1861-rotating-the-box.ts) | Medium | ✅ | 单趟重力模拟（k计数器swap）+ 顺时针旋转 |
| [#3300](https://leetcode.cn/problems/minimum-element-after-replacement-with-digit-sum/) | [替换为数位和以后的最小元素](problems/simulation/3300-minimum-element-after-replacement-with-digit-sum.ts) | Easy | ✅ | 遍历求每个数各位之和，取 min |

### hash-counting (3)

| 题号 | 标题 | 难度 | 一次过 | 解法 |
|---|---|---|:---:|---|
| [#242](https://leetcode.cn/problems/valid-anagram/) | [有效的字母异位词](problems/hash-counting/242-valid-anagram.ts) | Easy | — | Map 计数法：一遍累加一遍递减，最后判断是否全为 0 |
| [#3120](https://leetcode.cn/problems/count-the-number-of-special-characters-i/) | [统计特殊字母的数量 I](problems/hash-counting/3120-count-the-number-of-special-characters-i.ts) | Easy | ✅ | 双数组 low[26]/up[26] 标记出现，最后统计同时为 1 的位 |
| [#3121](https://leetcode.cn/problems/count-the-number-of-special-characters-ii/) | [统计特殊字母的数量 II](problems/hash-counting/3121-count-the-number-of-special-characters-ii.ts) | Medium | 🔁 | 状态机：单数组 state[26]，4 态 (0/1/2/-1) 单遍扫描 |

### bfs-dfs (2)

| 题号 | 标题 | 难度 | 一次过 | 解法 |
|---|---|---|:---:|---|
| [#1306](https://leetcode.cn/problems/jump-game-iii/) | [跳跃游戏 III](problems/bfs-dfs/1306-jump-game-iii.ts) | Medium | ✅ | 正向 BFS + 原地标记 visited（arr[i]=-1） |
| [#2812](https://leetcode.cn/problems/find-the-safest-path-in-a-grid/) | [找出最安全路径](problems/bfs-dfs/2812-find-the-safest-path-in-a-grid.ts) | Medium | 🔁 | 多源 BFS 建距离矩阵 + 二分答案 + BFS 验证连通性 |

### sliding-window (2)

| 题号 | 标题 | 难度 | 一次过 | 解法 |
|---|---|---|:---:|---|
| [#209](https://leetcode.cn/problems/minimum-size-subarray-sum/) | [长度最小的子数组](problems/sliding-window/209-minimum-size-subarray-sum.ts) | Medium | — | 滑动窗口，右扩左收求最小长度 |
| [#1358](https://leetcode.cn/problems/number-of-substrings-containing-all-three-characters/) | [包含所有三种字符的子字符串数目](problems/sliding-window/1358-number-of-substrings-containing-all-three-characters.ts) | Medium | ✅ | 滑动窗口：固定 right，尽量右移 left 到刚好不合法，以 right 结… |

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

### array-two-pointers (2)

| 题号 | 标题 | 难度 | 一次过 | 解法 |
|---|---|---|:---:|---|
| [#27](https://leetcode.cn/problems/remove-element/) | [移除元素](problems/array-two-pointers/27-remove-element.ts) | Easy | — | 快慢指针原地移除 |
| [#977](https://leetcode.cn/problems/squares-of-a-sorted-array/) | [有序数组的平方](problems/array-two-pointers/977-squares-of-a-sorted-array.ts) | Easy | — | 双指针从外往里填充 |

### greedy (1)

| 题号 | 标题 | 难度 | 一次过 | 解法 |
|---|---|---|:---:|---|
| [#1665](https://leetcode.cn/problems/minimum-initial-energy-to-finish-tasks/) | [完成所有任务的最少初始能量](problems/greedy/1665-minimum-initial-energy-to-finish-tasks.ts) | Hard | ✅ | 贪心排序（按 minimum-actual 降序）+ 反向 DP |

### binary-search (1)

| 题号 | 标题 | 难度 | 一次过 | 解法 |
|---|---|---|:---:|---|
| [#704](https://leetcode.cn/problems/binary-search/) | [二分查找](problems/binary-search/704-binary-search.ts) | Easy | — | 边界判断 + mid 收缩二分 |

---

## 🔧 维护

```bash
node scripts/generate-code-files.js   # 从 progress.json + solutions 生成代码文件
node scripts/generate-dashboard.js    # 生成 dashboard.html
node scripts/generate-readme.js       # 生成本 README
node scripts/build.js                 # 一键全部生成
```

_本 README 由脚本自动生成，请勿手动编辑。_
