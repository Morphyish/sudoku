import { getCell, getCol, getRow, getSquare } from '../utils'

export function sectorUpdate(helpers) {
    for (let i = 0; i < 9; i++) {
        const rows = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        const cols = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        const squares = [0, 0, 0, 0, 0, 0, 0, 0, 0]

        getRow(helpers, i).forEach(fill(rows))
        const rowValueIdx = rows.indexOf(1)
        if (rowValueIdx) {
            const value = rowValueIdx + 1
            for (let j = 0; j < 9; j++) {
                const update = checkHelper(helpers, j, i, value)
                if (update) {
                    return {
                        grid: update
                    }
                }
            }
        }

        getCol(helpers, i).forEach(fill(cols))
        const colValueIdx = cols.indexOf(1)
        if (colValueIdx) {
            const value = colValueIdx + 1
            for (let j = 0; j < 9; j++) {
                const update = checkHelper(helpers, i, j, value)
                if (update) {
                    return {
                        grid: update
                    }
                }
            }
        }

        getSquare(helpers, i).forEach(fill(squares))
        const squareValueIdx = squares.indexOf(1)
        if (squareValueIdx) {
            const value = squareValueIdx + 1
            const colsAnchor = 3 * (i % 3)
            const rowsAnchor = 3 * Math.floor(i / 3)
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    const [col, row] = [j + colsAnchor, k + rowsAnchor]
                    const update = checkHelper(
                        helpers,
                        col,
                        row,
                        value,
                    )
                    if (update) {
                        return {
                            grid: update
                        }
                    }
                }
            }
        }
    }

    return null
}

function fill(arr) {
    return cell => cell.forEach(num => arr[num - 1] += 1)
}

function checkHelper(helpers, col, row, value) {
    if (getCell(helpers, col, row).includes(value)) {
        return {
            col,
            row,
            value,
        }
    }
    return null
}
