/*
 * @lc app=leetcode.cn id=242 lang=typescript
 *
 * [242] 有效的字母异位词
 */

// @lc code=start
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
	// console.log("map", map.entries());
	return Array.from(map.values()).find((i) => i !== 0) ? false : true;
}
// @lc code=end
// isAnagram("anagram", "nagaram");
