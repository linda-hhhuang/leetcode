/*
 * @lc app=leetcode.cn id=59 lang=typescript
 *
 * [59] 螺旋矩阵 II
 */

// @lc code=start
function generateMatrix(n: number): number[][] {
	const result = new Array(n).fill(0).map(() => new Array(n).fill(0));
	const enum DIR {
		D = "D",
		S = "S",
		A = "A",
		W = "W",
	}
	let x = 0,
		y = -1;
	let d: DIR = DIR.D;

	const next = () => {
		let nx = x,
			ny = y;
		switch (d) {
			case DIR.D:
				if (ny === n - 1 || (ny + 1 < n && result[nx][ny + 1] !== 0)) {
					d = DIR.S;
					nx++;
				} else {
					ny++;
				}
				break;
			case DIR.S:
				if (nx === n - 1 || (nx + 1 < n && result[nx + 1][ny] !== 0)) {
					d = DIR.A;
					ny--;
				} else {
					nx++;
				}
				break;
			case DIR.A:
				if (ny === 0 || (ny - 1 >= 0 && result[nx][ny - 1] !== 0)) {
					d = DIR.W;
					nx--;
				} else {
					ny--;
				}
				break;
			case DIR.W:
				if (nx === 0 || (nx - 1 >= 0 && result[nx - 1][ny] !== 0)) {
					d = DIR.D;
					ny++;
				} else {
					nx--;
				}
				break;
			default:
		}
		return [nx, ny];
	};

	let step = 1;
	while (1) {
		const [nx, ny] = next();
		if (nx >= 0 && nx < n && ny >= 0 && ny < n && result[nx][ny] === 0) {
			result[nx][ny] = step++;
			x = nx;
			y = ny;
		} else {
			break;
		}
	}

	return result;
}
console.log(generateMatrix(6));
// @lc code=end
