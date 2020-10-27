import { clone, getCell, setCell } from '../utils'
import { removeValueFromLines } from './removeValueFromLines'
import { removeValueFromSquares } from './removeValueFromSquares'

export function updateHelpers(helpers, grid) {
    const clonedHelpers = clone(helpers)

    for (let col = 0; col < 9; col++) {
        for (let row = 0; row < 9; row++) {
            const num = getCell(grid, col, row)

            if (num === 0) {
                continue
            }

            removeValueFromLines(clonedHelpers, col, row, num)
            removeValueFromSquares(clonedHelpers, col, row, num)

            setCell(clonedHelpers, col, row, [])
        }
    }

    return clonedHelpers
}
