import { updateHelpers } from '../helper'
import { setCell } from '../utils'

export function applyStep(grid, helpers, step) {
    let clonedGrid = grid
    let clonedHelpers = helpers

    if (step.grid) {
        for (const { col, row, value } of step.grid) {
            setCell(clonedGrid, col, row, value)
        }
        clonedHelpers = updateHelpers(clonedHelpers, clonedGrid)
    }

    if (step.helpers) {
        for (const { col, row, values } of step.helpers) {
            setCell(clonedHelpers, col, row, values)
        }
    }

    return {
        grid: clonedGrid,
        helpers: clonedHelpers
    }
}
