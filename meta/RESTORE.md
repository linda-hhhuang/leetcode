# 🔄 RESTORE.md — 每日一题系统复原说明书

> **给未来任何 AI 助手 / 工具的一封信。**
>
> 如果用户对你说「恢复每日一题」「继续做题」「按这个仓库继续」之类的话，
> 你正在接手一套已经运行的 LeetCode 每日刷题陪练系统。
> 本文件让你无需任何额外上下文，就能完全复原并继续工作。
>
> **第一步永远是：读完本文件 + `meta/progress.json` + `meta/SKILL-leetcode-daily.md`。**

---

## 1. 这套系统是什么

一个 **AI 陪练式 LeetCode 每日刷题系统**，不是「帮用户做题」，而是「陪用户练思维」：

- 每天用户说「每日一题」→ 你拉取/推送当天题目
- 用户先自己想思路 → 你讨论、用反例验证、不直接给答案
- 思路对了 → 写代码 → 调 LeetCode API 提交 → AC
- AC 后 → 记录解法、更新仓库、推送 git
- 所有数据沉淀在这个 git 仓库里，可视化成大盘激励用户坚持

## 2. 用户是谁（关键偏好）

- 偏好 **TypeScript**（提交语言）
- 沟通：**中文、直接、简洁**，不要废话和过度恭维
- 做题风格：**先自己推思路**，你只做"讨论+验证"，**不要主动剧透解法**
- Easy 题：展示题目 + 直接给代码，等用户说"提交"再提交；AC 后再补一道 Medium/Hard
- Medium/Hard：等用户给思路 → 讨论 → 用户说写就写 → 提交
- 重视**复盘**：用户说"沉淀"时，把思路缺陷记进 `meta/pitfalls.md`
- 工程严谨：提交前能本地对拍/验证就先验证（有 node/tsx 环境）

## 3. 完整工作流（每次"每日一题"都按这个走）

```
1. 读 meta/progress.json 看 queue
   ├─ queue 非空 → 推送 queue[0]（还没 AC 的题，继续做）
   └─ queue 为空 → 拉取当天 LeetCode 每日一题入队
        └─ 若当天是 Easy → 展示题目+给代码，AC 后再往前找最近一道没做过的 Medium/Hard 补入队列

2. 展示题目（题号、标题、难度、链接、题意、示例、约束）

3. 用户给思路 → 讨论
   ├─ 思路有问题 → 给反例/提示方向，不直接说答案
   └─ 思路正确 → 确认，可补充边界情况

4. 用户说"写"/"提交" → 写 TypeScript 代码
   ├─ 有条件先本地对拍验证（tsx/ts-node）
   └─ 调 LeetCode REST API 提交（见 §5）

5. AC 后：
   a. 更新 meta/progress.json（题目移到 completed，填全字段）
   b. 写 solutions/<id>.md（题解）
   c. node scripts/build.js（重新生成代码文件+dashboard+README）
   d. git commit + push（见 §6）

6. WA（错误）→ 一起分析错误用例 → 回到第 3 步
```

## 4. 仓库结构

```
problems/<算法分类>/<题号>-<slug>.ts   # 代码（注释头：题号/难度/思路/是否一次过/复杂度）
solutions/<题号>.md                    # 详细题解
kamacoder/                             # 卡码网题（非 LeetCode，不计入统计）
meta/                                  # 系统元数据（复原用）⭐
├── progress.json                      # 单一数据源（队列+完成记录+规则）
├── SKILL-leetcode-daily.md            # 完整 skill 文档（含 API 细节）
├── pitfalls.md                        # 思路缺陷复盘
└── RESTORE.md                         # 本文件
dashboard.html                         # 做题大盘可视化
README.md                              # GitHub 首页（脚本生成，勿手改）
scripts/
├── generate-code-files.js            # progress.json + solutions → 代码文件
├── generate-dashboard.js             # → dashboard.html
├── generate-readme.js                # → README.md
└── build.js                          # 一键全部生成
```

## 5. LeetCode API（提交核心）

**认证**：需要 `LEETCODE_SESSION` cookie（JWT，约 30 天过期）。
- 用户本地存放位置：`~/.workbuddy/mcp.json` 的 `mcpServers.leetcode.env.LEETCODE_SESSION`
- 过期时让用户重新登录 leetcode.cn → F12 → Application → Cookies → 复制新值

**拉取当天每日一题**：
```bash
curl -s "https://leetcode.cn/graphql/" \
  -H "Content-Type: application/json" \
  -H "Cookie: LEETCODE_SESSION=<token>" \
  -d '{"query":"query { todayRecord { question { questionId questionFrontendId titleSlug translatedTitle difficulty topicTags { translatedName } } } }"}'
```
> 注意：`questionId` 是内部 ID（提交用），`questionFrontendId` 是显示题号。

**拉取题目详情**：
```bash
curl -s "https://leetcode.cn/graphql/" -H "Content-Type: application/json" \
  -H "Cookie: LEETCODE_SESSION=<token>" \
  -d '{"query":"query { question(titleSlug: \"<slug>\") { questionId content exampleTestcaseList } }"}'
```

**提交代码**（question_id 用内部 questionId）：
```bash
curl -s -X POST "https://leetcode.cn/problems/<slug>/submit/" \
  -H "Content-Type: application/json" \
  -H "Cookie: LEETCODE_SESSION=<token>" \
  -H "Referer: https://leetcode.cn/problems/<slug>/" \
  -d '{"lang":"typescript","question_id":"<questionId>","typed_code":"<code>"}'
# 返回 {"submission_id": xxx}
```

**轮询结果**（提交后 sleep 3~4 秒再查）：
```bash
curl -s "https://leetcode.cn/submissions/detail/<submission_id>/check/" \
  -H "Cookie: LEETCODE_SESSION=<token>"
# status_msg=="Accepted" 即 AC；看 runtime/memory/total_correct/total_testcases
```

> 历史经验：往历史日期找每日一题用 `dailyQuestionRecords(year, month)` 查询。

## 6. Git 同步

- 仓库：`git@github.com:linda-hhhuang/leetcode.git`（SSH），主分支 **master**
- **本地已配好 SSH key**（`~/.ssh/id_ed25519`，公钥已加到 GitHub），直接推送无需 token：
  ```bash
  git push origin master
  ```
- 每次 AC 后：`git add -A && git commit -m "solve: #<id> <title>" && git push origin master`
- 备用（SSH 不可用时）：用 PAT 临时拼 URL 推送，**绝不写进文件**：
  `git push "https://<PAT>@github.com/linda-hhhuang/leetcode.git" master`

## 7. progress.json 字段规范

```jsonc
{
  "rules": { /* 系统规则，见文件内 */ },
  "queue": [ /* 待完成题目 */ ],
  "completed": [{
    "id": 1358,                    // 显示题号 (questionFrontendId)
    "slug": "...",                 // titleSlug
    "title": "中文标题",
    "difficulty": "Easy|Medium|Hard",
    "category": "算法分类目录名",
    "enqueued": "YYYY-MM-DD",      // legacy 题为 null
    "solved": "YYYY-MM-DD",        // legacy 题为 null
    "first_try": true,             // 是否一次 AC；legacy 为 null
    "approach": "解法一句话",
    "note": "第一思路/卡壳原因",
    "complexity": "O(...)",
    "language": "typescript",
    "runtime": "11ms",
    "memory": "57.2MB",
    "submission_id": 733373021,
    "solution_file": "solutions/<id>.md",
    "source": "legacy"             // 仅历史题有，普通题无此字段
  }]
}
```

**算法分类目录**（已有）：trie / dynamic-programming / greedy / simulation / bfs-dfs / hash-counting / sliding-window / array-two-pointers / binary-search / linked-list。新类型按需新建同名目录。

**legacy 题**：早期用 LeetCode VS Code 插件手刷的题，日期/first_try 为 null，计入总数和分类，但**不进热力图、不算一次过率**。脚本已兼容。

## 8. 一键复原步骤（换模型/工具后）

1. `git clone git@github.com:linda-hhhuang/leetcode.git`（或 https 地址）
2. 读 `meta/RESTORE.md`（本文件）+ `meta/progress.json` + `meta/SKILL-leetcode-daily.md`
3. 确认 `~/.workbuddy/mcp.json` 里有有效的 `LEETCODE_SESSION`（没有就让用户提供）
4. 确认推送通道：本地已配 SSH key（`ssh -T git@github.com` 能认证即可直接 push）；新机器无 key 时让用户配 SSH 或临时给 PAT
5. 对用户说「每日一题」即可继续——你已经完全复原这套系统

---

_本系统由 Lennon Huang 与 AI 共同搭建，设计为模型无关、工具无关、可一键复原。_
_最后更新：2026-06-30_
