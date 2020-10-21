import { getCol, getRow } from '../helper'

// FIXME: not working for squares, unsure about rows/cols
// TODO: code duplication
// TODO: Improve upon algo to handle more than 2-tuples

export function checkHiddenTuple(helper, dryRun) {
    const snapshot = helper.snapshot()

    for (let i = 0; i < 9; i++) {
        const occurRow = {}
        const occurCol = {}

        getRow(i, snapshot).forEach(fill(occurRow))
        let numbers = Object.keys(occurRow)
        for (let j = 0; j < numbers.length; j++) {
            for (let k = j + 1; k < numbers.length; k++) {
                if (
                    occurRow[numbers[j]] === occurRow[numbers[k]] &&
                    occurRow[numbers[j]].length === 2
                ) {
                    let updated = false
                    const row = i
                    const [l, m] = occurRow[numbers[j]]
                    if (helper.getCell(l, row).length > 2) {
                        updated = true
                        if (!dryRun) {
                            helper.setCell(l, row, [numbers[j], numbers[k]])
                        }
                    }
                    if (helper.getCell(m, row).length > 2) {
                        updated = true
                        if (!dryRun) {
                            helper.setCell(m, row, [numbers[j], numbers[k]])
                        }
                    }
                    if (updated) {
                        const tuple = `(${numbers[j]}, ${numbers[k]})`
                        console.log(`found hidden tuple ${tuple} in row ${row + 1}`)
                        return {
                            solved: true,
                            value: 0,
                            coordinates: [],
                        }
                    }
                }
            }
        }

        getCol(i, snapshot).forEach(fill(occurCol))
        numbers = Object.keys(occurCol)
        for (let j = 0; j < numbers.length; j++) {
            for (let k = j + 1; k < numbers.length; k++) {
                if (
                    occurCol[numbers[j]] === occurCol[numbers[k]] &&
                    occurCol[numbers[j]].length === 2
                ) {
                    let updated = false
                    const col = i
                    const [l, m] = occurCol[numbers[j]]
                    if (helper.getCell(col, l).length > 2) {
                        updated = true
                        if (!dryRun) {
                            helper.setCell(col, l, [numbers[j], numbers[k]])
                        }
                    }
                    if (helper.getCell(col, m).length > 2) {
                        updated = true
                        if (!dryRun) {
                            helper.setCell(col, m, [numbers[j], numbers[k]])
                        }
                    }
                    if (updated) {
                        const tuple = `(${numbers[j]}, ${numbers[k]})`
                        console.log(`found hidden tuple ${tuple} in col ${col + 1}`)
                        return {
                            solved: true,
                            value: 0,
                            coordinates: [],
                        }
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

function fill(occurences) {
    return (line, index) => {
        if (!occurences[line]) {
            occurences[line] = []
        }
        occurences[line].push(index)
    }
}

// TODO: use this grid to test algo
const grid = [
    [0,0,0,6,0,0,0,0,0],
    [0,7,2,5,9,1,0,4,0],
    [0,0,1,0,3,0,0,0,5],
    [0,4,3,2,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,4],
    [2,8,7,0,0,6,5,9,0],
    [5,0,0,0,6,0,4,0,0],
    [0,2,0,0,5,8,6,3,0],
    [0,0,0,0,0,7,0,0,0],
]
