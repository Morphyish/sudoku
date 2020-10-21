export function checkOwning(helper, dryRun) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j += 3) {
            const takenInRow = new Set()
            const ownInRow = sqRow(helper, i, j)

            for (let k = 0; k < 6; k++) {
                const index = (j + k + 3) % 9
                ownInRow.forEach(num => {
                    const cell = helper.getCell(index, i)
                    if (!(cell.indexOf(num) >= 0)) {
                        return
                    }
                    if (!dryRun) {
                        helper.removeFromCell(index, i, num)
                    }
                    takenInRow.add(num)
                })
            }

            if (takenInRow.size > 0) {
                const rowsAnchor = 3 * Math.floor(i / 3)
                const square = `(${rowsAnchor + 1}, ${j + 1}) -> (${rowsAnchor + 3}, ${j + 3})`
                console.log(`${[...takenInRow]} taken in row ${i + 1} by square ${square}`)
                return {
                    solved: true,
                    value: 0,
                    coordinates: [],
                }
            }

            const takenInCol = new Set()
            const ownInCol = sqCol(helper, j, i)

            for (let k = 0; k < 6; k++) {
                const index = (j + k + 3) % 9
                ownInCol.forEach(num => {
                    const cell = helper.getCell(i, index)
                    if (!(cell.indexOf(num) >= 0)) {
                        return
                    }
                    if (!dryRun) {
                        helper.removeFromCell(i, index, num)
                    }
                    takenInCol.add(num)
                })
            }

            if (takenInCol.size > 0) {
                const rowAnchor = 3 * Math.floor(i / 3)
                const square = `(${j + 1}, ${rowAnchor + 1}) -> (${j + 3}, ${rowAnchor + 3})`
                console.log(`${[...takenInCol]} taken in col ${i + 1} by square ${square}`)
                return {
                    solved: true,
                    value: 0,
                    coordinates: [],
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

function sqRow(helper, row, col) {
    const rowAnchor = 3 * Math.floor(row / 3)
    const colAnchor = 3 * Math.floor(col / 3)
    let ownInRow = new Set()
    for (let c = colAnchor; c < colAnchor + 3; c++) {
        const own = new Set(helper.getCell(c, row))
        ownInRow = new Set([...ownInRow, ...own])
    }
    for (let r = rowAnchor; r < rowAnchor + 3; r++) {
        if (r === row) {
            continue
        }
        for (let c = colAnchor; c < colAnchor + 3; c++) {
            helper.getCell(c, r).forEach(n => ownInRow.delete(n))
        }
    }
    return ownInRow
}

function sqCol(helper, row, col) {
    const rowAnchor = 3 * Math.floor(row / 3)
    const colAnchor = 3 * Math.floor(col / 3)
    let ownInCol = new Set()
    for (let r = rowAnchor; r < rowAnchor + 3; r++) {
        const own = new Set(helper.getCell(col, r))
        ownInCol = new Set([...ownInCol, ...own])
    }
    for (let r = rowAnchor; r < rowAnchor + 3; r++) {
        for (let c = colAnchor; c < colAnchor + 3; c++) {
            if (c === col) {
                continue
            }
            helper.getCell(c, r).forEach(n => ownInCol.delete(n))
        }
    }
    return ownInCol
}
