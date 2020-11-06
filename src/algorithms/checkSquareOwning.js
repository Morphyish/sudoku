import { getCell } from '../utils'

export function checkSquareOwning(helpers) {
    for (let i = 0; i < 9; i++) {
        const { rowAnchor } = getAnchors(0, i)

        for (let j = 0; j < 9; j += 3) {
            const ownInRow = findOwnInRow(helpers, j, i)
            const { takenInRow, cells: cellsFromRow } = removeTakenFromRow(helpers, ownInRow, i, j)

            if (takenInRow.size > 0) {
                const square = `(${rowAnchor + 1}, ${j + 1}) -> (${rowAnchor + 3}, ${j + 3})`
                // console.log(`${[...takenInRow]} taken in row ${i + 1} by square ${square}`)
                return {
                    helpers: cellsFromRow
                }
            }

            const ownInCol = findOwnInCol(helpers, i, j)
            const { takenInCol, cells: cellsFromCol } = removeTakenFromCol(helpers, ownInCol, i, j)

            if (takenInCol.size > 0) {
                const square = `(${j + 1}, ${rowAnchor + 1}) -> (${j + 3}, ${rowAnchor + 3})`
                // console.log(`${[...takenInCol]} taken in col ${i + 1} by square ${square}`)
                return {
                    helpers: cellsFromCol
                }
            }
        }
    }
    return null
}

function findOwnInRow(helpers, col, row) {
    const { colAnchor, rowAnchor } = getAnchors(col, row)

    let rowHelpers = new Set()
    for (let c = colAnchor; c < colAnchor + 3; c++) {
        const own = new Set(getCell(helpers, c, row))
        rowHelpers = new Set([...rowHelpers, ...own])
    }
    removeSquareDuplicatesFromLine(helpers, rowHelpers, undefined, row, colAnchor, rowAnchor)

    return rowHelpers
}

function findOwnInCol(helpers, col, row) {
    const { colAnchor, rowAnchor } = getAnchors(col, row)

    let colHelpers = new Set()
    for (let r = rowAnchor; r < rowAnchor + 3; r++) {
        const own = new Set(getCell(helpers, col, r))
        colHelpers = new Set([...colHelpers, ...own])
    }
    removeSquareDuplicatesFromLine(helpers, colHelpers, col, undefined, colAnchor, rowAnchor)

    return colHelpers
}

function getAnchors(col, row) {
    const colAnchor = 3 * Math.floor(col / 3)
    const rowAnchor = 3 * Math.floor(row / 3)

    return {
        colAnchor,
        rowAnchor,
    }
}

function removeSquareDuplicatesFromLine(helpers, ownInLine, col, row, colAnchor, rowAnchor) {
    for (let r = rowAnchor; r < rowAnchor + 3; r++) {
        if (r === row) {
            continue
        }
        for (let c = colAnchor; c < colAnchor + 3; c++) {
            if (c === col) {
                continue
            }
            getCell(helpers, c, r).forEach(n => ownInLine.delete(n))
        }
    }
}

function removeTakenFromRow(helpers, ownInRow, i, j) {
    let takenInRow = new Set()
    const cells = []

    for (let k = 0; k < 6; k++) {
        const index = (j + k + 3) % 9
        const { takenInCell, cells: updatedCells } = removeFromCell(helpers, ownInRow, index, i)
        takenInRow = new Set([...takenInRow, ...takenInCell])
        cells.push(...updatedCells)
    }

    return {
        takenInRow,
        cells,
    }
}

function removeTakenFromCol(helpers, ownInCol, i, j) {
    let takenInCol = new Set()
    const cells = []

    for (let k = 0; k < 6; k++) {
        const index = (j + k + 3) % 9
        const { takenInCell, cells: updatedCells } = removeFromCell(helpers, ownInCol, i, index)
        takenInCol = new Set([...takenInCol, ...takenInCell])
        cells.push(...updatedCells)
    }

    return {
        takenInCol,
        cells,
    }
}

function removeFromCell(helpers, ownInLine, col, row) {
    const takenInCell = new Set()
    const cells = []

    ownInLine.forEach(num => {
        const cell = getCell(helpers, col, row)
        if (cell.indexOf(num) === -1) {
            return
        }
        const newValues = cell.filter(value => value !== num)
        cells.push({
            col,
            row,
            values: newValues,
        })
        takenInCell.add(num)
    })

    return {
        takenInCell,
        cells,
    }
}
