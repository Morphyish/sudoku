export function validate(grid, helper) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const num = grid[i][j]
            if (num === 0 && helper[i][j].length < 1) {
                return false
            }
            if (num === 0) {
                continue
            }
            for (let k = 0; k < 9; k++) {
                if (k !== i && grid[k][j] === num) {
                    return false
                }
                if (k !== j && grid[i][k] === num) {
                    return false
                }
            }
            const icorner = 3 * Math.floor(i / 3)
            const jcorner = 3 * Math.floor(j / 3)
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    const r = icorner + k
                    const c = jcorner + l
                    if (!(r === i && c === j) && grid[r][c] === num) {
                        return false
                    }
                }
            }
        }
    }
    return true
}
