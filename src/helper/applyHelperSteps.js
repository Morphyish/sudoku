import { clone, setCell } from '../utils'

export function applyHelperSteps(helpers, steps) {
    let updatedHelpers = clone(helpers)

    if (steps) {
        for (const { col, row, values } of steps) {
            setCell(updatedHelpers, col, row, values)
        }
    }

    return updatedHelpers
}
