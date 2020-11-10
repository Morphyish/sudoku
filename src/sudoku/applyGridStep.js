import { clone, setCell } from '../utils'

export function applyGridStep(grid, step) {
    if (!step) {
        return grid
    }

     const clonedGrid = clone(grid)

    const { col, row, value } = step
    setCell(clonedGrid, col, row, value)

    return clonedGrid
}
