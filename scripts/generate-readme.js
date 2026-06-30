#!/usr/bin/env node
/**
 * 从 progress.json 生成 README.md（GitHub 首页概览）
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const progress = JSON.parse(fs.readFileSync(path.join(ROOT, 'progress.json'), 'utf8'));
const done = progress.completed;

const total = done.length;
const byDiff = { Easy: 0, Medium: 0, Hard: 0 };
const byCat = {};
let firstTry = 0;
const dates = new Set();
const tracked = done.filter(q => q.solved);
let trackedFirstTry = 0;
const legacyCount = done.length - tracked.length;
for (const q of done) {
  byDiff[q.difficulty]++;
  byCat[q.category] = (byCat[q.category] || 0) + 1;
}
for (const q of tracked) {
  if (q.first_try) trackedFirstTry++;
  dates.add(q.solved);
}
const rate = tracked.length ? Math.round(trackedFirstTry / tracked.length * 100) : 0;

const diffBadge = (l, n, c) => `![${l}](https://img.shields.io/badge/${l}-${n}-${c})`;

let catSection = '';
const cats = Object.entries(byCat).sort((a,b)=>b[1]-a[1]);
for (const [cat, n] of cats) {
  catSection += `\n### ${cat} (${n})\n\n`;
  const list = done.filter(q=>q.category===cat).sort((a,b)=>a.id-b.id);
  catSection += '| 题号 | 标题 | 难度 | 一次过 | 解法 |\n|---|---|---|:---:|---|\n';
  for (const q of list) {
    const tryMark = q.source === 'legacy' ? '—' : (q.first_try ? '✅' : '🔁');
    const rel = `problems/${q.category}/${q.id}-${q.slug}.ts`;
    const appr = (q.approach || '').slice(0, 40) + ((q.approach || '').length > 40 ? '…' : '');
    catSection += `| [#${q.id}](https://leetcode.cn/problems/${q.slug}/) | [${q.title}](${rel}) | ${q.difficulty} | ${tryMark} | ${appr} |\n`;
  }
}

const md = `# 🧗 我的 LeetCode 刷题之旅

> 每日一题 · 讨论式学习 · 思路沉淀。代码按算法类型分类，附第一思路与卡壳复盘。

## 📊 总览

${diffBadge('Total', total, '6366f1')} ${diffBadge('Easy', byDiff.Easy, '00af9b')} ${diffBadge('Medium', byDiff.Medium, 'ffb800')} ${diffBadge('Hard', byDiff.Hard, 'ef4743')} ${diffBadge('一次通过率', rate + '%25', '00af9b')}

- **总完成**：${total} 题（含 ${legacyCount} 道早期手刷历史题）
- **每日一题活跃日**：${dates.size} 天
- **难度分布**：Easy ${byDiff.Easy} / Medium ${byDiff.Medium} / Hard ${byDiff.Hard}
- **一次通过率**：${rate}%（${trackedFirstTry}/${tracked.length}，仅统计每日一题）

> 📈 可视化大盘见 [dashboard.html](dashboard.html)（本地打开查看热力图）
> 🏷 标记说明：✅ 一次通过 · 🔁 非一次通过 · — 历史题无记录

## 🗂 目录结构

\`\`\`
problems/<算法分类>/<题号>-<slug>.ts   # 代码（含注释头：思路/是否一次过/复杂度）
solutions/<题号>.md                    # 详细题解
pitfalls.md                            # 思路缺陷复盘记录
progress.json                          # 结构化进度数据（单一数据源）
dashboard.html                         # 做题大盘可视化
scripts/                               # 生成脚本
\`\`\`

## 📚 题目清单（按算法分类）
${catSection}
---

## 🔧 维护

\`\`\`bash
node scripts/generate-code-files.js   # 从 progress.json + solutions 生成代码文件
node scripts/generate-dashboard.js    # 生成 dashboard.html
node scripts/generate-readme.js       # 生成本 README
node scripts/build.js                 # 一键全部生成
\`\`\`

_本 README 由脚本自动生成，请勿手动编辑。_
`;

fs.writeFileSync(path.join(ROOT, 'README.md'), md);
console.log('✅ 生成 README.md');
