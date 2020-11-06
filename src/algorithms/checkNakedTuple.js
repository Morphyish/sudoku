import { getCell, getCol, getRow, getSquare } from '../utils'

export function checkNakedTuple(helpers) {
    for (let i = 0; i < 9; i++) {
        const zones = {
            row: getRow(helpers, i),
            col: getCol(helpers, i),
            square: getSquare(helpers, i),
        }

        for (let [label, zone] of Object.entries(zones)) {
            const updates = []
            for (let values of zone) {
                const sameValueCells = zone.filter(cell => JSON.stringify(cell) === JSON.stringify(values))
                if (sameValueCells.length === values.length) {
                    const { updated, cells } = remove(helpers, values, i, label)
                    if (updated) {
                        // console.log(`found tuple ${values} in ${label} ${i + 1}`)
                        updates.push(...cells)
                        break
                    }
                }
            }
            if (updates.length) {
                return {
                    helpers: updates
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
        default:
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
