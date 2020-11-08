import { clone, getCoordinatesFromIndex, setCell, shuffle } from '../utils'
import { solve } from '../sudoku'

export function empty(grid) {
    const cellIndexes = Array.from(Array(81).keys())
    const shuffledCellIndexes = shuffle(cellIndexes)

    const {grid: emptiedGrid, methods, nbOfCells, leftoverIndexes } = removeNextPair(grid, shuffledCellIndexes)
    if (nbOfCells > 17) {
        const shuffledLeftovers = shuffle(leftoverIndexes)
        const { grid: finalGrid, methods: finalMethods, nbOfCells: finalNbOfCells } = removeNextCell(emptiedGrid, shuffledLeftovers)
        return {
            grid: finalGrid,
            methods: finalMethods || methods,
            nbOfCells: finalNbOfCells || nbOfCells,
        }
    }

    return {
        grid: emptiedGrid,
        methods,
        nbOfCells,
    }
}

function removeNextPair(grid, cellIndexes) {
    if (cellIndexes.length < 18) {
        return {
            grid,
            leftoverIndexes: cellIndexes,
        }
    }

    const skipCells = []

    for (const cellIndex of cellIndexes) {
        if (skipCells.includes(cellIndex)) continue

        const clonedGrid = clone(grid)

        const symCellIndex = 80 - cellIndex
        skipCells.push(cellIndex, symCellIndex)

        const [col, row] = getCoordinatesFromIndex(cellIndex)
        const [symCol, symRow] = getCoordinatesFromIndex(symCellIndex)
        setCell(clonedGrid, col, row, 0)
        setCell(clonedGrid, symCol, symRow, 0)

        const { isSolvable, methods } = solve(clonedGrid)
        if (isSolvable) {
            const index = cellIndexes.indexOf(cellIndex)
            cellIndexes.splice(index, 1)
            const symIndex = cellIndexes.indexOf(symCellIndex)
            cellIndexes.splice(symIndex, 1)
            const { grid: updatedGrid, methods: nextMethods, leftoverIndexes } = removeNextPair(clonedGrid, cellIndexes)
            return {
                grid: updatedGrid,
                methods: nextMethods || methods,
                nbOfCells: cellIndexes.length,
                leftoverIndexes,
            }
        }
    }

    return {
        grid,
        leftoverIndexes: cellIndexes,
    }
}

function removeNextCell(grid, cellIndexes) {
    if (cellIndexes.length < 18) {
        return {
            grid,
        }
    }

    for (const cellIndex of cellIndexes) {
        const clonedGrid = clone(grid)

        const [col, row] = getCoordinatesFromIndex(cellIndex)
        setCell(clonedGrid, col, row, 0)

        const { isSolvable, methods } = solve(clonedGrid)
        if (isSolvable) {
            const index = cellIndexes.indexOf(cellIndex)
            cellIndexes.splice(index, 1)
            const { grid: updatedGrid, methods: nextMethods } = removeNextCell(clonedGrid, cellIndexes)
            return {
                grid: updatedGrid,
                methods: nextMethods || methods,
                nbOfCells: cellIndexes.length,
            }
        }
    }

    return {
        grid,
    }
}
