import { getCol, getRow, getSquare } from '../helper'

export function checkNakedTuple(helper, dryRun) {
    const snapshot = helper.snapshot()

    for (let i = 0; i < 9; i++) {
        const zones = {
            row: getRow(i, snapshot),
            col: getCol(i, snapshot),
            square: getSquare(i, snapshot),
        }

        for (let [key, value] of Object.entries(zones)) {
            const updated = value.some(row => {
                const temp = value.filter(r => JSON.stringify(r) === JSON.stringify(row))
                if (temp.length === row.length) {
                    const found = remove(helper, snapshot, temp[0], i, key, dryRun)
                    if (found) {
                        console.log(`found tuple ${temp[0]} in ${key} ${i + 1}`)
                        return true
                    }
                }
            })
            if (updated) {
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

function remove(helper, snapshot, values, index, zone, dryRun) {
    let edited = false

    switch (zone) {
        case 'row':
            const helperRow = getRow(index, snapshot)
            helperRow.forEach((cell, col) => {
                const oldVal = [...cell]
                const newVal = cleanRow(helper, cell, values, col, index, dryRun)
                if (!edited && JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                    edited = true
                }
            })
            return edited
        case 'col':
            const helperCol = getCol(index, snapshot)
            helperCol.forEach((cell, row) => {
                const oldVal = [...cell]
                const newVal = cleanCol(helper, cell, values, index, row, dryRun)
                if (!edited && JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                    edited = true
                }
            })
            return edited
        case 'square':
            const rowAnchor = 3 * Math.floor(index / 3)
            const colAnchor = 3 * (index % 3)
            for (let col = 0; col < 3; col++) {
                for (let row = 0; row < 3; row++) {
                    const cell = helper.getCell(colAnchor + col, rowAnchor + row)
                    const oldVal = [...cell]
                    const newVal = cleanSquare(helper, cell, values, index, row * 3 + col, dryRun)
                    if (!edited && JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                        edited = true
                    }
                }
            }
            return edited
    }
}

function cleanRow(helper, cell, values, col, row, dryRun) {
    if (JSON.stringify(values) !== JSON.stringify(cell)) {
        if (!dryRun) {
            values.forEach(n => helper.removeFromCell(col, row, n))
        }
        return helper.getCell(col, row)
    }
    return cell
}

function cleanCol(helper, cell, values, col, row, dryRun) {
    if (JSON.stringify(values) !== JSON.stringify(cell)) {
        if (!dryRun) {
            values.forEach(n => helper.removeFromCell(col, row, n))
        }
        return helper.getCell(col, row)
    }
    return cell
}

function cleanSquare(helper, cell, values, numAnchor, num, dryRun) {
    if (JSON.stringify(values) !== JSON.stringify(cell)) {
        const rowAnchor = 3 * Math.floor(numAnchor / 3)
        const colAnchor = 3 * (numAnchor % 3)
        const row = rowAnchor + Math.floor(num / 3)
        const col = colAnchor + (num % 3)
        if (!dryRun) {
            values.forEach(n => helper.removeFromCell(col, row, n))
        }
        return helper.getCell(col, row)
    }
    return cell
}

// TODO: use this grid to test algo
const grid = [
    [8,0,0,0,1,0,0,0,9],
    [0,3,5,0,4,0,0,0,1],
    [0,0,0,0,7,0,0,0,3],
    [1,8,0,3,9,4,6,0,0],
    [5,9,6,7,2,1,3,8,4],
    [3,0,4,5,8,6,0,1,0],
    [2,6,0,4,3,0,0,0,0],
    [7,1,0,0,5,0,2,4,6],
    [4,5,0,0,6,0,0,0,8],
]
