#!/usr/bin/env node
/**
 * 一键生成：代码文件 + dashboard + README
 * 用法: node scripts/build.js
 */
const { execSync } = require('child_process');
const path = require('path');
const dir = __dirname;
for (const s of ['generate-code-files.js', 'generate-dashboard.js', 'generate-readme.js']) {
  execSync(`node ${path.join(dir, s)}`, { stdio: 'inherit' });
}
console.log('🎉 全部生成完成');
