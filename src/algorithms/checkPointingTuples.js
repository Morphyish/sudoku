import { getCell, getCol, getRow, getSquare, removeDuplicates } from '../utils'

export function checkPointingTuples(helpers) {
    for (let i = 0; i < 9; i++) {
        const [col, row] = getSquareAnchor(i)
        const squareHelpers = getSquare(helpers, i)
        const square = [
            squareHelpers.slice(0, 3),
            squareHelpers.slice(3, 6),
            squareHelpers.slice(6, 9),
        ]

        for (let j = 0; j < 3; j++) {
            const squareCol = getCol(square, j)
            const squareRow = getRow(square, j)
            const squareColHelpers = removeDuplicates(squareCol.flat())
            const squareRowHelpers = removeDuplicates(squareRow.flat())

            const pointingColTuples = findPointingColTuples(helpers, squareColHelpers, i, col + j, j)
            if (pointingColTuples) {
                return {
                    helpers: pointingColTuples,
                }
            }

            const pointingRowTuples = findPointingRowTuples(helpers, squareRowHelpers, i, row + j, j)
            if (pointingRowTuples) {
                return {
                    helpers: pointingRowTuples,
                }
            }
        }
    }
    return null
}

function getSquareAnchor(num) {
    const col = 3 * (num % 3)
    const row = 3 * Math.floor(num / 3)

    return [col, row]
}

function findPointingColTuples(helpers, boxHelpers, num, col, colInSquare) {
    let squareHelpers = getSquare(helpers, num)
    // Remove in reverse order to prevent indexes from changing
    squareHelpers.splice(colInSquare + 6, 1)
    squareHelpers.splice(colInSquare + 3, 1)
    squareHelpers.splice(colInSquare, 1)

    const pinnedHelpers = getPinnedHelpers(boxHelpers, squareHelpers)
    if (pinnedHelpers.length) {
        // console.log('pinned helpers', pinnedHelpers, 'in col', col, 'from square', num)
        return removeFromCol(helpers, pinnedHelpers, col, num)
    }

    return null
}

function findPointingRowTuples(helpers, boxHelpers, num, row, rowInSquare) {
    let squareHelpers = getSquare(helpers, num)
    squareHelpers.splice(rowInSquare * 3, 3)

    const pinnedHelpers = getPinnedHelpers(boxHelpers, squareHelpers)
    if (pinnedHelpers.length) {
        // console.log('pinned helpers', pinnedHelpers, 'in row', line, 'from square', num)
        return removeFromRow(helpers, pinnedHelpers, row, num)
    }

    return null
}

function getPinnedHelpers(helpers, squareHelpers) {
    const values = squareHelpers.flat()
    return helpers.filter(h => !values.includes(h))
}

function removeFromCol(helpers, toRemove, col, squareToIgnore) {
    const steps = []

    const indexToIgnore = Math.floor(squareToIgnore / 3)
    for (let row = 0; row < 9; row++) {
        if (row >= indexToIgnore * 3 && row < indexToIgnore * 3 + 3) {
            continue
        }

        const newSteps = removeFromCell(helpers, toRemove, col, row)
        steps.push(...newSteps)
    }

    if (steps.length) {
        return steps
    }

    return null
}

function removeFromRow(helpers, toRemove, row, squareToIgnore) {
    const steps = []

    const indexToIgnore = squareToIgnore % 3
    for (let col = 0; col < 9; col++) {
        if (col >= indexToIgnore * 3 && col < indexToIgnore * 3 + 3) {
            continue
        }

        const newSteps = removeFromCell(helpers, toRemove, col, row)
        steps.push(...newSteps)
    }

    if (steps.length) {
        return steps
    }

    return null
}

function removeFromCell(helpers, valuesToRemove, col, row) {
    const cell = getCell(helpers, col, row)
    return valuesToRemove.reduce((steps, valueToRemove) => {
        if (cell?.includes(valueToRemove)) {
            const newCell = cell.filter(value => value !== valueToRemove)
            return [
                ...steps,
                {
                    col,
                    row,
                    values: newCell,
                },
            ]
        }

        return steps
    }, [])
}
