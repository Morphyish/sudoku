import { getCell, getCol, getRow, getSquare } from '../utils'

export function checkNakedPair(helpers) {
    for (let i = 0; i < 9; i++) {
        const zones = {
            row: getRow(helpers, i),
            col: getCol(helpers, i),
            square: getSquare(helpers, i),
        }

        for (let [zone, cells] of Object.entries(zones)) {
            for (const cell of cells) {
                if (cell.length === 2) {
                    const sameValueCells = cells.filter(c => JSON.stringify(c) === JSON.stringify(cell))
                    if (sameValueCells.length === 2) {
                        const { updated, cells: updatedCells } = remove(helpers, cell, i, zone)
                        if (updated) {
                            // console.log(`found naked pair ${cell} in ${zone} ${i + 1}`)
                            return {
                                helpers: updatedCells
                            }
                        }
                    }
                }
            }
        }
    }

    return null
}

function remove(helpers, values, index, zone) {
    let updated = false
    const cells = []

    switch (zone) {
        case 'row':
            const helperRow = getRow(helpers, index)
            helperRow.forEach((cell, col) => {
                if (JSON.stringify(cell) !== JSON.stringify(values)) {
                    const newValues = filterOutValues(cell, values)
                    if (JSON.stringify(cell) !== JSON.stringify(newValues)) {
                        cells.push({
                            col,
                            row: index,
                            values: newValues,
                        })
                        updated = true
                    }
                }
            })
            break
        case 'col':
            const helperCol = getCol(helpers, index)
            helperCol.forEach((cell, row) => {
                if (JSON.stringify(cell) !== JSON.stringify(values)) {
                    const newValues = filterOutValues(cell, values)
                    if (JSON.stringify(cell) !== JSON.stringify(newValues)) {
                        cells.push({
                            col: index,
                            row,
                            values: newValues,
                        })
                        updated = true
                    }
                }
            })
            break
        case 'square':
            const rowAnchor = 3 * Math.floor(index / 3)
            const colAnchor = 3 * (index % 3)
            for (let col = 0; col < 3; col++) {
                for (let row = 0; row < 3; row++) {
                    const cell = getCell(helpers, colAnchor + col, rowAnchor + row)
                    if (JSON.stringify(cell) !== JSON.stringify(values)) {
                        const newValues = filterOutValues(cell, values)
                        if (JSON.stringify(cell) !== JSON.stringify(newValues)) {
                            cells.push({
                                col: colAnchor + col,
                                row: rowAnchor + row,
                                values: newValues,
                            })
                            updated = true
                        }
                    }
                }
            }
            break
    }

    return {
        updated,
        cells,
    }
}

function filterOutValues(cell, valuesToRemove) {
    return cell.filter(value => !valuesToRemove.includes(value))
}
