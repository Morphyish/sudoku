import { getCol, getRow, getSquare } from '../helper'

// TODO: Improve upon algo to handle more than 2-tuples

export function checkHiddenTuple(helper, dryRun) {
    const snapshot = helper.snapshot()

    for (let i = 0; i < 9; i++) {
        const zones = {
            row: getRow(i, snapshot),
            col: getCol(i, snapshot),
            square: getSquare(i, snapshot),
        }

        for (let [key, value] of Object.entries(zones)) {
            const hiddenPairs = findHiddenPairs(value)
            if (hiddenPairs) {
                for (const hiddenPair of hiddenPairs) {
                    const [pair, indexes] = hiddenPair
                    const tuple = pair.split(',').map(v => parseInt(v))
                    const updated = remove(helper, i, tuple, indexes, key, dryRun)

                    if (updated) {
                        console.log(`found hidden tuple ${pair} in ${key} ${i + 1}`)
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

function findHiddenPairs(array) {
    const hiddenPairs = {}

    // find every pair, and store indexes for each one
    array.forEach((cell, index) => {
        if (cell.length) {
            const pairs = findPairs(cell)
            for (const pair of pairs) {
                if (!hiddenPairs[pair]) {
                    hiddenPairs[pair] = []
                }
                hiddenPairs[pair].push(index)
            }
        }
    })

    // filter off every pair that doesn't occur exactly twice
    for (const [pair, indexes] of Object.entries(hiddenPairs)) {
        if (indexes.length !== 2) {
            delete hiddenPairs[pair]
        }
    }

    // filter off pairs which includes values that are found outside of those cells
    for (const [pair, indexes] of Object.entries(hiddenPairs)) {
        const foundOutsideOfPair = array.some((cell, index) => {
            if (cell.length === 0 || indexes.includes(index)) {
                return false
            }

            const [firstValue, secondValue] = pair.split(',').map(v => parseInt(v))
            return cell.includes(firstValue) || cell.includes(secondValue)
        })

        if (foundOutsideOfPair) {
            delete hiddenPairs[pair]
        }
    }

    return Object.entries(hiddenPairs)
}

function findPairs(array) {
    return array
        .map((v, index) => {
            return array.slice(index + 1).map(w => [v, w])
        })
        .flat()
}

function remove(helper, num, tuple, indexes, zone, dryRun) {
    let edited = false

    switch (zone) {
        case 'row':
            for (const index of indexes) {
                const cell = helper.getCell(index, num)
                const oldVal = [...cell]
                if (JSON.stringify(oldVal) !== JSON.stringify(tuple)) {
                    if (!dryRun) {
                        helper.setCell(index, num, tuple)
                    }
                    edited = true
                }
            }
            return edited
        case 'col':
            for (const index of indexes) {
                const cell = helper.getCell(num, index)
                const oldVal = [...cell]
                if (JSON.stringify(oldVal) !== JSON.stringify(tuple)) {
                    if (!dryRun) {
                        helper.setCell(num, index, tuple)
                    }
                    edited = true
                }
            }
            return edited
        case 'square':
            const rowAnchor = 3 * Math.floor(num / 3)
            const colAnchor = 3 * (num % 3)
            for (const index of indexes) {
                const col = colAnchor + (index % 3)
                const row = rowAnchor + Math.floor(index / 3)
                const cell = helper.getCell(col, row)
                const oldVal = [...cell]
                if (JSON.stringify(oldVal) !== JSON.stringify(tuple)) {
                    if (!dryRun) {
                        helper.setCell(col, row, tuple)
                    }
                    edited = true
                }
            }
            return edited
    }
}

// TODO: use this grid to test algo
const grid = [
    [0, 0, 0, 6, 0, 0, 0, 0, 0],
    [0, 7, 2, 5, 9, 1, 0, 4, 0],
    [0, 0, 1, 0, 3, 0, 0, 0, 5],
    [0, 4, 3, 2, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 4],
    [2, 8, 7, 0, 0, 6, 5, 9, 0],
    [5, 0, 0, 0, 6, 0, 4, 0, 0],
    [0, 2, 0, 0, 5, 8, 6, 3, 0],
    [0, 0, 0, 0, 0, 7, 0, 0, 0],
]
