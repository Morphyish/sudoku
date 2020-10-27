import { getCell, getCol, getRow, getSquare } from '../utils'

export function sectorUpdate(helpers) {
    for (let i = 0; i < 9; i++) {
        const rows = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        const cols = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        const squares = [0, 0, 0, 0, 0, 0, 0, 0, 0]

        getRow(i, helpers).forEach(fill(rows))
        const rowIdx = rows.indexOf(1)
        if (rowIdx) {
            for (let j = 0; j < 9; j++) {
                const update = checkHelper(helpers, j, i, rowIdx + 1)
                if (update) {
                    return {
                        grid: [update]
                    }
                }
            }
        }

        getCol(i, helpers).forEach(fill(cols))
        const colIdx = cols.indexOf(1)
        if (colIdx) {
            for (let j = 0; j < 9; j++) {
                const update = checkHelper(helpers, i, j, colIdx + 1)
                if (update) {
                    return {
                        grid: [update]
                    }
                }
            }
        }

        getSquare(i, helpers).forEach(fill(squares))
        const squareIdx = squares.indexOf(1)
        if (squareIdx) {
            const rowsAnchor = 3 * Math.floor(i / 3)
            const colsAnchor = 3 * (i % 3)
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    const [col, row] = [j + rowsAnchor, k + colsAnchor]
                    const update = checkHelper(
                        helpers,
                        col,
                        row,
                        squareIdx + 1,
                    )
                    if (update) {
                        return {
                            grid: [update]
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
    if (getCell(helpers, col, row).indexOf(value) >= 0) {
        return {
            col,
            row,
            value,
        }
    }
    return null
}
