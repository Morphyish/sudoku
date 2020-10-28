import { clone, getCoordinatesFromIndex, setCell, shuffle } from '../utils'
import { solve } from '../sudoku'

export function empty(grid) {
    const cellIndexes = Array.from(Array(81).keys())
    const shuffledCellIndexes = shuffle(cellIndexes)

    return removeNextPair(grid, shuffledCellIndexes)
}

function removeNextPair(grid, cellIndexes) {
    if (cellIndexes.length < 20) {
        return grid
    }

    for (const cellIndex of cellIndexes) {
        const clonedGrid = clone(grid)
        const symCellIndex = 80 - cellIndex
        const [col, row] = getCoordinatesFromIndex(cellIndex)
        const [symCol, symRow] = getCoordinatesFromIndex(symCellIndex)
        setCell(clonedGrid, col, row, 0)
        setCell(clonedGrid, symCol, symRow, 0)

        const { isSolvable, steps } = solve(clonedGrid)
        if (isSolvable) {
            const index = cellIndexes.indexOf(cellIndex)
            cellIndexes.splice(index, 1)
            const symIndex = cellIndexes.indexOf(symCellIndex)
            cellIndexes.splice(symIndex, 1)
            console.log('steps to solve', steps.length)
            return removeNextPair(clonedGrid, cellIndexes)
        }
    }

    return grid
}