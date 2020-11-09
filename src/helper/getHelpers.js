import { initHelpers } from './initHelpers'
import { getCell, setCell } from '../utils'
import { removeValueFromLines } from './removeValueFromLines'
import { removeValueFromSquares } from './removeValueFromSquares'

export function getHelpers(grid) {
    const helpers = initHelpers()

    for (let col = 0; col < 9; col++) {
        for (let row = 0; row < 9; row++) {
            const num = getCell(grid, col, row)

            if (num === 0) {
                continue
            }

            removeValueFromLines(helpers, col, row, num)
            removeValueFromSquares(helpers, col, row, num)

            setCell(helpers, col, row, [])
        }
    }

    return helpers
}
