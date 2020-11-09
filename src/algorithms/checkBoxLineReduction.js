import { getCell, getCol, getRow, getSquare, removeDuplicates } from '../utils'

export function checkBoxLineReduction(helpers) {
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

            const boxColReduction = findBoxColReduction(helpers, squareColHelpers, col, row, j)
            if (boxColReduction) {
                return {
                    helpers: boxColReduction,
                }
            }

            const boxRowReduction = findBoxRowReduction(helpers, squareRowHelpers, col, row, j)
            if (boxRowReduction) {
                return {
                    helpers: boxRowReduction,
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

function findBoxColReduction(helpers, boxHelpers, col, row, colInSquare) {
    const colIndex = col + colInSquare
    const colHelpers = getCol(helpers, colIndex)

    const pinnedHelpers = getPinnedHelpers(colHelpers, boxHelpers, row)
    if (pinnedHelpers.length) {
        // console.log('pinned helpers', pinnedHelpers, 'in square', col, row, 'from col', colIndex)
        return removeFromSquare(helpers, pinnedHelpers, col, row, colIndex, 'col')
    }

    return null
}

function findBoxRowReduction(helpers, boxHelpers, col, row, rowInSquare) {
    const rowIndex = row + rowInSquare
    const rowHelpers = getRow(helpers, rowIndex)

    const pinnedHelpers = getPinnedHelpers(rowHelpers, boxHelpers, col)
    if (pinnedHelpers.length) {
        // console.log('pinned helpers', pinnedHelpers, 'in square', col, row, 'from row', rowIndex)
        return removeFromSquare(helpers, pinnedHelpers, col, row, rowIndex, 'row')
    }

    return null
}

function getPinnedHelpers(lineHelpers, boxHelpers, squareIndex) {
    lineHelpers.splice(squareIndex, 3)
    lineHelpers = lineHelpers.flat()

    return boxHelpers.filter(h => !lineHelpers.includes(h))
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

            const newSteps = removeFromCell(helpers, helpersToRemove, i, j)
            steps.push(...newSteps)
        }
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
