#!/usr/bin/env node
/**
 * 从 progress.json + solutions/*.md 生成分类代码文件
 * problems/<category>/<id>-<slug>.ts
 * 每个文件头部带：题号、标题、难度、链接、是否一次过、第一思路/卡壳原因
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const progress = JSON.parse(fs.readFileSync(path.join(ROOT, 'progress.json'), 'utf8'));

function extractCode(solutionFile) {
  const p = path.join(ROOT, solutionFile);
  if (!fs.existsSync(p)) return null;
  const md = fs.readFileSync(p, 'utf8');
  // 抓第一个 ```typescript ... ``` 代码块
  const m = md.match(/```typescript\s*\n([\s\S]*?)```/);
  return m ? m[1].trimEnd() : null;
}

let generated = 0;
for (const q of progress.completed) {
  // legacy 历史题的代码文件已手工就位，无 solution_file，跳过不覆盖
  if (q.source === 'legacy' || !q.solution_file) continue;
  const code = extractCode(q.solution_file);
  if (!code) { console.warn(`⚠️  无代码: #${q.id}`); continue; }

  const dir = path.join(ROOT, 'problems', q.category);
  fs.mkdirSync(dir, { recursive: true });

  const tryMark = q.first_try ? '✅ 一次通过' : '❌ 非一次通过';
  const header = `/**
 * LeetCode #${q.id} - ${q.title}
 * 难度: ${q.difficulty} | 分类: ${q.category}
 * 链接: https://leetcode.cn/problems/${q.slug}/
 * 完成: ${q.solved} | ${tryMark}
 *
 * 第一思路 / 卡壳原因:
 *   ${q.note}
 *
 * 解法: ${q.approach}
 * 复杂度: ${q.complexity}
 * Runtime: ${q.runtime} | Memory: ${q.memory}
 */

`;

  const file = path.join(dir, `${q.id}-${q.slug}.ts`);
  fs.writeFileSync(file, header + code + '\n');
  generated++;
}

console.log(`✅ 生成 ${generated} 个代码文件`);
