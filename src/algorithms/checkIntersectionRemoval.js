import { getCell, getCol, getRow, getSquare } from '../utils'

export function checkIntersectionRemoval(helpers) {
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
            const squareColHelpers = [...new Set(squareCol.flat())]
            const squareRowHelpers = [...new Set(squareRow.flat())]
            // Pointing Tuples
            const colPointingTuple = pointingTuples(helpers, squareColHelpers, i, col + j, j, 'col')
            if (colPointingTuple) {
                return {
                    helpers: colPointingTuple.steps,
                }
            }

            const rowPointingTuple = pointingTuples(helpers, squareColHelpers, i, row + j, j, 'row')
            if (rowPointingTuple) {
                return {
                    helpers: rowPointingTuple.steps,
                }
            }

            // Box Line Reduction
            const boxColReduction = boxLineReduction(helpers, squareColHelpers, col, row, j, 'col')
            if (boxColReduction) {
                return {
                    helpers: boxColReduction.steps,
                }
            }

            const boxRowReduction = boxLineReduction(helpers, squareRowHelpers, col, row, j, 'row')
            if (boxRowReduction) {
                return {
                    helpers: boxRowReduction.steps,
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

function pointingTuples(helpers, boxHelpers, num, line, squareLine, zone) {
    let squareHelpers = getSquare(helpers, num)
    if (zone === 'col') {
        // Remove in reverse order to prevent indexes from changing
        squareHelpers.splice(squareLine + 6, 1)
        squareHelpers.splice(squareLine + 3, 1)
        squareHelpers.splice(squareLine, 1)
    } else {
        squareHelpers.splice(squareLine * 3, 3)
    }

    squareHelpers = squareHelpers.flat()
    const pinnedHelpers = boxHelpers.filter(h => !squareHelpers.includes(h))

    if (pinnedHelpers.length) {
        // console.log('pinned helpers', pinnedHelpers, 'in', zone, line, 'from square', num, 'squareLine', squareLine)
        return removeFromLine(helpers, pinnedHelpers, line, num, zone)
    }

    return null
}

function removeFromLine(helpers, helpersToRemove, lineIndex, squareToIgnore, zone) {
    const steps = []

    const indexToIgnore = zone === 'col' ? Math.floor(squareToIgnore / 3) : squareToIgnore % 3

    for (let i = 0; i < 9; i++) {
        if (i >= indexToIgnore * 3 && i < indexToIgnore * 3 + 3) {
            continue
        }

        const col = zone === 'col' ? lineIndex : i
        const row = zone === 'col' ? i : lineIndex

        helpersToRemove.forEach(valueToRemove => {
            const cell = getCell(helpers, col, row)
            const step = removeFromCell(cell, valueToRemove, col, row)
            if (step) {
                steps.push(step)
            }
        })
    }

    if (steps.length) {
        return {
            steps,
        }
    }

    return null
}

function boxLineReduction(helpers, boxHelpers, col, row, offset, zone) {
    let lineHelpers = []
    if (zone === 'col') {
        lineHelpers = getCol(helpers, col + offset)
        lineHelpers.splice(row, 3)
    } else {
        lineHelpers = getRow(helpers, row + offset)
        lineHelpers.splice(col, 3)
    }

    lineHelpers = lineHelpers.flat()
    const pinnedHelpers = boxHelpers.filter(h => !lineHelpers.includes(h))

    if (pinnedHelpers.length) {
        // console.log('pinned helpers', pinnedHelpers, 'in square', col, row, zone, offset)
        const lineToIgnore = zone === 'col' ? col + offset : row + offset
        return removeFromSquare(helpers, pinnedHelpers, col, row, lineToIgnore, zone)
    }

    return null
}

function removeFromSquare(helpers, helpersToRemove, col, row, lineToIgnore, zone) {
    const steps = []

    for (let i = col; i < col + 3; i++) {
        if (zone === 'col' && i === lineToIgnore) {
            continue
        }

        for (let j = row; j < row + 3; j++) {
            if (zone === 'row' && j === lineToIgnore) {
                continue
            }

            helpersToRemove.forEach(valueToRemove => {
                const cell = getCell(helpers, i, j)
                const step = removeFromCell(cell, valueToRemove, i, j)
                if (step) {
                    steps.push(step)
                }
            })
        }
    }

    if (steps.length) {
        return {
            steps,
        }
    }

    return null
}

function removeFromCell(cell, valueToRemove, col, row) {
    if (cell?.includes(valueToRemove)) {
        const newCell = cell.filter(value => value !== valueToRemove)
        return {
            col,
            row,
            values: newCell,
        }
    }

    return null
}
