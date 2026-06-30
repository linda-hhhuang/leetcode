/**
 * LeetCode #242 - 有效的字母异位词
 * 难度: Easy | 分类: hash-counting
 * 链接: https://leetcode.cn/problems/valid-anagram/
 * 来源: legacy（历史题，早期手刷）
 */

function isAnagram(s: string, t: string): boolean {
	const map = new Map();
	s.split("").forEach((c) => {
		let item = map.get(c);
		map.set(c, item ? item + 1 : 1);
	});
	const ta = t.split("");
	for (const c of ta) {
		let item = map.get(c);
		if (!item) return false;
		map.set(c, item - 1);
	}
	return Array.from(map.values()).find((i) => i !== 0) ? false : true;
}
