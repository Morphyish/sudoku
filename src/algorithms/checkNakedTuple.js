import { getCell, getCol, getRow, getSquare, removeDuplicates } from '../utils'

export function checkNakedTuple(helpers) {
    for (let num = 0; num < 9; num++) {
        const zones = {
            row: getRow(helpers, num),
            col: getCol(helpers, num),
            square: getSquare(helpers, num),
        }

        for (let [zone, cells] of Object.entries(zones)) {
            const length = cells.length - 1
            for (let i = 0; i < length - 2; i++) {
                if (cells[i].length === 0) {
                    continue
                }

                for (let j = i + 1; j < length - 1; j++) {
                    if (cells[j].length === 0) {
                        continue
                    }

                    for (let k = j + 1; k < length; k++) {
                        if (cells[k].length === 0) {
                            continue
                        }

                        const tripleCandidates = [
                            cells[i],
                            cells[j],
                            cells[k],
                        ]

                        // Triples
                        let values = removeDuplicates(tripleCandidates.flat())
                        if (values.length === 3) {
                            const { updated, cells: updatedCells } = remove(helpers, values, num, zone)
                            if (updated) {
                                // console.log(`found naked triple ${values} in ${zone} ${i + 1}`)
                                return {
                                    helpers: updatedCells
                                }
                            }
                        }

                        // Quads
                        for (let l = k + 1; l < length; l++) {
                            if (cells[l].length === 0) {
                                continue
                            }

                            const quadCandidates = [
                                ...tripleCandidates,
                                cells[l],
                            ]
                            const values = removeDuplicates(quadCandidates.flat())
                            if (values.length === 4) {
                                const { updated, cells: updatedCells } = remove(helpers, values, num, zone)
                                if (updated) {
                                    // console.log(`found naked quads ${values} in ${zone} ${i + 1}`)
                                    return {
                                        helpers: updatedCells
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return null
}

function remove(helpers, values, num, zone) {
    let updated = false
    const cells = []

    switch (zone) {
        case 'row':
            const helperRow = getRow(helpers, num)
            helperRow.forEach((cell, col) => {
                if (cell.some(value => !values.includes(value))) {
                    const newValues = filterOutValues(cell, values)
                    if (JSON.stringify(cell) !== JSON.stringify(newValues)) {
                        cells.push({
                            col,
                            row: num,
                            values: newValues,
                        })
                        updated = true
                    }
                }
            })
            break
        case 'col':
            const helperCol = getCol(helpers, num)
            helperCol.forEach((cell, row) => {
                if (cell.some(value => !values.includes(value))) {
                    const newValues = filterOutValues(cell, values)
                    if (JSON.stringify(cell) !== JSON.stringify(newValues)) {
                        cells.push({
                            col: num,
                            row,
                            values: newValues,
                        })
                        updated = true
                    }
                }
            })
            break
        case 'square':
            const rowAnchor = 3 * Math.floor(num / 3)
            const colAnchor = 3 * (num % 3)
            for (let col = 0; col < 3; col++) {
                for (let row = 0; row < 3; row++) {
                    const cell = getCell(helpers, colAnchor + col, rowAnchor + row)
                    if (cell.some(value => !values.includes(value))) {
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
