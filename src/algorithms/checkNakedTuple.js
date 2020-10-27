import { getCol, getRow, getSquare } from '../helper'
import { getCell } from '../utils'

export function checkNakedTuple(helpers) {
    for (let i = 0; i < 9; i++) {
        const zones = {
            row: getRow(i, helpers),
            col: getCol(i, helpers),
            square: getSquare(i, helpers),
        }

        for (let [label, zone] of Object.entries(zones)) {
            const updatedHelpers = zone.some((updatedCells, values) => {
                const sameValueCells = zone.filter(cell => JSON.stringify(cell) === JSON.stringify(values))
                if (sameValueCells.length === values.length) {
                    const { updated, cells } = remove(helpers, values, i, label)
                    if (updated) {
                        console.log(`found tuple ${values} in ${label} ${i + 1}`)
                        return updatedCells.push(...cells)
                    }
                }
                return updatedCells
            }, [])
            if (updatedHelpers.length) {
                return {
                    helpers: updatedHelpers
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
            const helperRow = getRow(index, helpers)
            helperRow.forEach((cell, col) => {
                if (JSON.stringify(cell) !== JSON.stringify(values)) {
                    const newValues = filterOutValues(cell, values)
                    cells.push({
                        col,
                        row: index,
                        values: newValues,
                    })
                    updated = true
                }
            })
            break
        case 'col':
            const helperCol = getCol(index, helpers)
            helperCol.forEach((cell, row) => {
                if (JSON.stringify(cell) !== JSON.stringify(values)) {
                    const newValues = filterOutValues(cell, values)
                    cells.push({
                        col: index,
                        row,
                        values: newValues,
                    })
                    updated = true
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
                        cells.push({
                            col: colAnchor + col,
                            row: rowAnchor + row,
                            values: newValues,
                        })
                        updated = true
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

// TODO: use this grid to test algo
const grid = [
    [8, 0, 0, 0, 1, 0, 0, 0, 9],
    [0, 3, 5, 0, 4, 0, 0, 0, 1],
    [0, 0, 0, 0, 7, 0, 0, 0, 3],
    [1, 8, 0, 3, 9, 4, 6, 0, 0],
    [5, 9, 6, 7, 2, 1, 3, 8, 4],
    [3, 0, 4, 5, 8, 6, 0, 1, 0],
    [2, 6, 0, 4, 3, 0, 0, 0, 0],
    [7, 1, 0, 0, 5, 0, 2, 4, 6],
    [4, 5, 0, 0, 6, 0, 0, 0, 8],
]
