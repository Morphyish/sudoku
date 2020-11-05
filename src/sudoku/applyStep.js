import { updateHelpers } from '../helper'
import { setCell } from '../utils'

export function applyStep(grid, helpers, step) {
    let clonedGrid = grid
    let clonedHelpers = helpers

    if (step.helpers) {
        for (const { col, row, values } of step.helpers) {
            setCell(clonedHelpers, col, row, values)
        }
    }

    if (step.grid) {
        const { col, row, value } = step.grid
        setCell(clonedGrid, col, row, value)
        clonedHelpers = updateHelpers(clonedHelpers, clonedGrid)
    }

    return {
        grid: clonedGrid,
        helpers: clonedHelpers
    }
}
