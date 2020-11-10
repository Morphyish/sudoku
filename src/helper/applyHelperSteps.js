import { clone, setCell } from '../utils'

export function applyHelperSteps(helpers, steps) {
    if (!steps || steps.length === 0) {
        return helpers
    }

    let updatedHelpers = clone(helpers)

    for (const { col, row, values } of steps) {
        setCell(updatedHelpers, col, row, values)
    }

    return updatedHelpers
}
