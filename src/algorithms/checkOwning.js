export function checkOwning(helper) {
    for (let i = 0; i < 9; i++) {
        const { rowAnchor } = getAnchors(0, i)

        for (let j = 0; j < 9; j += 3) {
            const ownInRow = findOwnInRow(helper, j, i)
            const { takenInRow, cells: cellsFromRow } = removeTakenFromRow(helper, ownInRow, i, j)

            if (takenInRow.size > 0) {
                const square = `(${rowAnchor + 1}, ${j + 1}) -> (${rowAnchor + 3}, ${j + 3})`
                console.log(`${[...takenInRow]} taken in row ${i + 1} by square ${square}`)
                return {
                    helpers: cellsFromRow
                }
            }

            const ownInCol = findOwnInCol(helper, i, j)
            const { takenInCol, cells: cellsFromCol } = removeTakenFromCol(helper, ownInCol, i, j)

            if (takenInCol.size > 0) {
                const square = `(${j + 1}, ${rowAnchor + 1}) -> (${j + 3}, ${rowAnchor + 3})`
                console.log(`${[...takenInCol]} taken in col ${i + 1} by square ${square}`)
                return {
                    helpers: cellsFromCol
                }
            }
        }
    }
    return null
}

function findOwnInRow(helper, col, row) {
    const { colAnchor, rowAnchor } = getAnchors(col, row)

    let rowHelpers = new Set()
    for (let c = colAnchor; c < colAnchor + 3; c++) {
        const own = new Set(helper.getCell(c, row))
        rowHelpers = new Set([...rowHelpers, ...own])
    }
    removeSquareDuplicatesFromLine(helper, rowHelpers, undefined, row, colAnchor, rowAnchor)

    return rowHelpers
}

function findOwnInCol(helper, col, row) {
    const { colAnchor, rowAnchor } = getAnchors(col, row)

    let colHelpers = new Set()
    for (let r = rowAnchor; r < rowAnchor + 3; r++) {
        const own = new Set(helper.getCell(col, r))
        colHelpers = new Set([...colHelpers, ...own])
    }
    removeSquareDuplicatesFromLine(helper, colHelpers, col, undefined, colAnchor, rowAnchor)

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

function removeSquareDuplicatesFromLine(helper, ownInLine, col, row, colAnchor, rowAnchor) {
    for (let r = rowAnchor; r < rowAnchor + 3; r++) {
        if (r === row) {
            continue
        }
        for (let c = colAnchor; c < colAnchor + 3; c++) {
            if (c === col) {
                continue
            }
            helper.getCell(c, r).forEach(n => ownInLine.delete(n))
        }
    }
}

function removeTakenFromRow(helper, ownInRow, i, j) {
    let takenInRow = new Set()
    const cells = []

    for (let k = 0; k < 6; k++) {
        const index = (j + k + 3) % 9
        const { takenInCell, cells: updatedCells } = removeFromCell(helper, ownInRow, index, i)
        takenInRow = new Set([...takenInRow, ...takenInCell])
        cells.push(...updatedCells)
    }

    return {
        takenInRow,
        cells,
    }
}

function removeTakenFromCol(helper, ownInCol, i, j) {
    let takenInCol = new Set()
    const cells = []

    for (let k = 0; k < 6; k++) {
        const index = (j + k + 3) % 9
        const { takenInCell, cells: updatedCells } = removeFromCell(helper, ownInCol, i, index)
        takenInCol = new Set([...takenInCol, ...takenInCell])
        cells.push(...updatedCells)
    }

    return {
        takenInCol,
        cells,
    }
}

function removeFromCell(helper, ownInLine, col, row) {
    const takenInCell = new Set()
    const cells = []

    ownInLine.forEach(num => {
        const cell = helper.getCell(col, row)
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
