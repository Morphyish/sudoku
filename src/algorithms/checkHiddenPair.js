import { getCell, getCol, getRow, getSquare } from '../utils'

// TODO: Improve upon algo to handle more than 2-tuples

export function checkHiddenPair(helpers) {
    for (let i = 0; i < 9; i++) {
        const zones = {
            row: getRow(helpers, i),
            col: getCol(helpers, i),
            square: getSquare(helpers, i),
        }

        for (let [label, zone] of Object.entries(zones)) {
            const hiddenPairs = findHiddenPairs(zone)
            if (hiddenPairs.length) {
                for (const hiddenPair of hiddenPairs) {
                    const [pair, indexes] = hiddenPair
                    const tuple = pair.split(',').map(v => parseInt(v))
                    const {updated, cells} = remove(helpers, i, tuple, indexes, label)

                    if (updated) {
                        console.log(`found hidden pair ${pair} in ${label} ${i + 1}`)
                        return {
                            helpers: cells,
                        }
                    }
                }
            }
        }
    }

    return null
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

function remove(helpers, num, tuple, indexes, zone) {
    let updated = false
    const cells = []

    switch (zone) {
        case 'row':
            for (const index of indexes) {
                const cell = getCell(helpers, index, num)
                if (JSON.stringify(cell) !== JSON.stringify(tuple)) {
                    updated = true
                    cells.push({
                        col: index,
                        row: num,
                        values: tuple,
                    })
                }
            }
            break
        case 'col':
            for (const index of indexes) {
                const cell = getCell(helpers, num, index)
                if (JSON.stringify(cell) !== JSON.stringify(tuple)) {
                    updated = true
                    cells.push({
                        col: num,
                        row: index,
                        values: tuple,
                    })
                }
            }
            break
        case 'square':
            const rowAnchor = 3 * Math.floor(num / 3)
            const colAnchor = 3 * (num % 3)
            for (const index of indexes) {
                const col = colAnchor + (index % 3)
                const row = rowAnchor + Math.floor(index / 3)
                const cell = getCell(helpers, col, row)
                if (JSON.stringify(cell) !== JSON.stringify(tuple)) {
                    updated = true
                    cells.push({
                        col,
                        row,
                        values: tuple,
                    })
                }
            }
            break
    }

    return {
        updated,
        cells,
    }
}
