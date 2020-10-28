export function validate(grid, helper) {
    const cellsWithError = new Set()
    let isValid = true

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const num = grid[row][col]
            if (num === 0 && helper[row][col].length < 1) {
                isValid = false
            }
            if (num === 0) {
                continue
            }
            for (let k = 0; k < 9; k++) {
                if (k !== row && grid[k][col] === num) {
                    cellsWithError.add(`${col},${row}`)
                    cellsWithError.add(`${col},${k}`)
                    isValid = false
                }
                if (k !== col && grid[row][k] === num) {
                    cellsWithError.add(`${col},${row}`)
                    cellsWithError.add(`${k},${row}`)
                    isValid = false
                }
            }
            const icorner = 3 * Math.floor(row / 3)
            const jcorner = 3 * Math.floor(col / 3)
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    const r = icorner + k
                    const c = jcorner + l
                    if (!(r === row && c === col) && grid[r][c] === num) {
                        cellsWithError.add(`${col},${row}`)
                        cellsWithError.add(`${c},${r}`)
                        isValid = false
                    }
                }
            }
        }
    }
    return {
        isValid,
        cellsWithError,
    }
}
