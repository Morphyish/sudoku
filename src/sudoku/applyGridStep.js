import { clone, setCell } from '../utils'

export function applyGridStep(grid, step) {
     const clonedGrid = clone(grid)

    if (step) {
        const { col, row, value } = step
        setCell(clonedGrid, col, row, value)
    }

    return clonedGrid
}
