#!/usr/bin/env node
/**
 * 从 progress.json 生成做题大盘 dashboard.html（自包含，无外部依赖）
 * 含：核心统计卡片、日历热力图、难度分布、分类分布、一次过率、最近做题流水
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const progress = JSON.parse(fs.readFileSync(path.join(ROOT, 'progress.json'), 'utf8'));
const done = progress.completed;

// ---- 统计 ----
const total = done.length;
const byDiff = { Easy: 0, Medium: 0, Hard: 0 };
const byCat = {};
let firstTryCount = 0;
const solvedDates = {}; // date -> count
for (const q of done) {
  byDiff[q.difficulty] = (byDiff[q.difficulty] || 0) + 1;
  byCat[q.category] = (byCat[q.category] || 0) + 1;
  if (q.first_try) firstTryCount++;
  solvedDates[q.solved] = (solvedDates[q.solved] || 0) + 1;
}
const firstTryRate = total ? Math.round((firstTryCount / total) * 100) : 0;

// 连续天数 & 活跃天数
const dateList = Object.keys(solvedDates).sort();
const activeDays = dateList.length;
const firstDay = dateList[0] || '-';
const lastDay = dateList[dateList.length - 1] || '-';

// ---- 日历热力图：最近 ~17 周 ----
function buildHeatmap() {
  const today = new Date();
  const cells = [];
  const weeks = 18;
  const start = new Date(today);
  start.setDate(start.getDate() - (weeks * 7 - 1));
  // 对齐到周一
  const day = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - day);
  for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
    const iso = d.toISOString().slice(0, 10);
    cells.push({ date: iso, count: solvedDates[iso] || 0 });
  }
  return cells;
}
const heatCells = buildHeatmap();

function heatColor(c) {
  if (c === 0) return '#ebedf0';
  if (c === 1) return '#9be9a8';
  if (c === 2) return '#40c463';
  if (c === 3) return '#30a14e';
  return '#216e39';
}

// 按周分列
const columns = [];
for (let i = 0; i < heatCells.length; i += 7) {
  columns.push(heatCells.slice(i, i + 7));
}
let heatHTML = '<div class="heatmap">';
for (const col of columns) {
  heatHTML += '<div class="hm-col">';
  for (const cell of col) {
    heatHTML += `<div class="hm-cell" style="background:${heatColor(cell.count)}" title="${cell.date}: ${cell.count} 题"></div>`;
  }
  heatHTML += '</div>';
}
heatHTML += '</div>';

// ---- 难度条 ----
const maxDiff = Math.max(byDiff.Easy, byDiff.Medium, byDiff.Hard, 1);
const diffBar = (label, val, color) =>
  `<div class="bar-row"><span class="bar-label">${label}</span><div class="bar-track"><div class="bar-fill" style="width:${(val/maxDiff*100)}%;background:${color}"></div></div><span class="bar-val">${val}</span></div>`;

// ---- 分类条 ----
const catEntries = Object.entries(byCat).sort((a,b)=>b[1]-a[1]);
const maxCat = Math.max(...catEntries.map(e=>e[1]), 1);
let catHTML = '';
for (const [cat, val] of catEntries) {
  catHTML += `<div class="bar-row"><span class="bar-label">${cat}</span><div class="bar-track"><div class="bar-fill" style="width:${(val/maxCat*100)}%;background:#6366f1"></div></div><span class="bar-val">${val}</span></div>`;
}

// ---- 最近做题流水 ----
const recent = [...done].sort((a,b)=>b.solved.localeCompare(a.solved)).slice(0, 12);
let recentHTML = '';
for (const q of recent) {
  const dc = { Easy:'#00af9b', Medium:'#ffb800', Hard:'#ef4743' }[q.difficulty];
  const tryIcon = q.first_try ? '<span class="ok">✅</span>' : '<span class="ng">🔁</span>';
  recentHTML += `<tr>
    <td>${q.solved}</td>
    <td><a href="https://leetcode.cn/problems/${q.slug}/" target="_blank">#${q.id} ${q.title}</a></td>
    <td><span class="diff" style="color:${dc}">${q.difficulty}</span></td>
    <td>${q.category}</td>
    <td style="text-align:center">${tryIcon}</td>
  </tr>`;
}

const updatedAt = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LeetCode 做题大盘</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif; background: #f6f8fa; color: #24292f; padding: 32px 20px; }
  .wrap { max-width: 920px; margin: 0 auto; }
  h1 { font-size: 26px; margin-bottom: 4px; }
  .sub { color: #6b7280; font-size: 13px; margin-bottom: 24px; }
  .cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 28px; }
  .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 18px; text-align: center; }
  .card .num { font-size: 30px; font-weight: 700; }
  .card .lbl { font-size: 12px; color: #6b7280; margin-top: 4px; }
  .c-total .num { color: #6366f1; }
  .c-hard .num { color: #ef4743; }
  .c-streak .num { color: #ff8c00; }
  .c-rate .num { color: #00af9b; }
  .panel { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 22px; }
  .panel h2 { font-size: 15px; margin-bottom: 16px; color: #374151; }
  .heatmap { display: flex; gap: 3px; overflow-x: auto; padding-bottom: 4px; }
  .hm-col { display: flex; flex-direction: column; gap: 3px; }
  .hm-cell { width: 13px; height: 13px; border-radius: 2px; }
  .legend { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #6b7280; margin-top: 12px; }
  .legend .hm-cell { width: 11px; height: 11px; }
  .bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 9px; font-size: 13px; }
  .bar-label { width: 160px; text-align: right; color: #4b5563; flex-shrink: 0; }
  .bar-track { flex: 1; background: #f0f0f3; border-radius: 6px; height: 18px; overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 6px; transition: width .3s; }
  .bar-val { width: 28px; font-weight: 600; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th, td { padding: 9px 8px; border-bottom: 1px solid #f0f0f3; text-align: left; }
  th { color: #6b7280; font-weight: 600; font-size: 12px; }
  td a { color: #2563eb; text-decoration: none; }
  td a:hover { text-decoration: underline; }
  .diff { font-weight: 600; }
  .quote { background: linear-gradient(135deg,#6366f1,#8b5cf6); color: #fff; border-radius: 12px; padding: 18px 22px; margin-bottom: 22px; font-size: 14px; line-height: 1.6; }
</style>
</head>
<body>
<div class="wrap">
  <h1>🧗 LeetCode 做题大盘</h1>
  <div class="sub">更新于 ${updatedAt} · 首刷 ${firstDay} → 最近 ${lastDay}</div>

  <div class="quote">
    已经坚持了 <b>${activeDays}</b> 个做题日，啃下 <b>${byDiff.Hard}</b> 道 Hard。<br>
    每天一道，积少成多 —— 继续保持节奏！💪
  </div>

  <div class="cards">
    <div class="card c-total"><div class="num">${total}</div><div class="lbl">总完成题数</div></div>
    <div class="card c-hard"><div class="num">${byDiff.Hard}</div><div class="lbl">Hard 攻克</div></div>
    <div class="card c-streak"><div class="num">${activeDays}</div><div class="lbl">活跃做题日</div></div>
    <div class="card c-rate"><div class="num">${firstTryRate}%</div><div class="lbl">一次通过率</div></div>
  </div>

  <div class="panel">
    <h2>📅 做题热力图（最近 18 周）</h2>
    ${heatHTML}
    <div class="legend">少 <div class="hm-cell" style="background:#ebedf0"></div><div class="hm-cell" style="background:#9be9a8"></div><div class="hm-cell" style="background:#40c463"></div><div class="hm-cell" style="background:#30a14e"></div><div class="hm-cell" style="background:#216e39"></div> 多</div>
  </div>

  <div class="panel">
    <h2>🎯 难度分布</h2>
    ${diffBar('Easy', byDiff.Easy, '#00af9b')}
    ${diffBar('Medium', byDiff.Medium, '#ffb800')}
    ${diffBar('Hard', byDiff.Hard, '#ef4743')}
  </div>

  <div class="panel">
    <h2>🗂 算法分类分布</h2>
    ${catHTML}
  </div>

  <div class="panel">
    <h2>🕒 最近做题流水</h2>
    <table>
      <thead><tr><th>日期</th><th>题目</th><th>难度</th><th>分类</th><th style="text-align:center">一次过</th></tr></thead>
      <tbody>${recentHTML}</tbody>
    </table>
  </div>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(ROOT, 'dashboard.html'), html);
console.log('✅ 生成 dashboard.html');
console.log(`   总题数 ${total} | Hard ${byDiff.Hard} | 活跃 ${activeDays} 天 | 一次过率 ${firstTryRate}%`);
