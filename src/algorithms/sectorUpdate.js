import { getCol, getRow, getSquare } from '../helper'

export function sectorUpdate(helper) {
    const snapshot = helper.snapshot()

    for (let i = 0; i < 9; i++) {
        const rows = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        const cols = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        const squares = [0, 0, 0, 0, 0, 0, 0, 0, 0]

        getRow(i, snapshot).forEach(fill(rows))
        const rowIdx = rows.indexOf(1)
        if (rowIdx) {
            for (let j = 0; j < 9; j++) {
                const val = checkHelper(helper, j, i, rowIdx + 1)
                if (val) {
                    return val
                }
            }
        }

        getCol(i, snapshot).forEach(fill(cols))
        const colIdx = cols.indexOf(1)
        if (colIdx) {
            for (let j = 0; j < 9; j++) {
                const val = checkHelper(helper, i, j, colIdx + 1)
                if (val) {
                    return val
                }
            }
        }

        getSquare(i, snapshot).forEach(fill(squares))
        const squareIdx = squares.indexOf(1)
        if (squareIdx) {
            const rowsAnchor = 3 * Math.floor(i / 3)
            const colsAnchor = 3 * (i % 3)
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    const [col, row] = [j + rowsAnchor, k + colsAnchor]
                    const val = checkHelper(
                        helper,
                        col,
                        row,
                        squareIdx + 1,
                    )
                    if (val) {
                        return val
                    }
                }
            }
        }
    }

    return {
        solved: false,
        value: 0,
        coordinates: [],
    }
}

function fill(arr) {
    return cell => cell.forEach(num => arr[num - 1] += 1)
}

function checkHelper(helper, col, row, value) {
    if (helper.getCell(col, row).indexOf(value) >= 0) {
        return {
            solved: true,
            value,
            coordinates: [row, col],
        }
    }
    return null
}
