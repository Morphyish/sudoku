import { clone } from '../utils'
import { removeValueFromCell } from './removeValueFromCell'

export function removeValueFromSquares(helper, col, row, value) {
    const updatedHelper = clone(helper)

    const xCorner = 3 * Math.floor(col / 3)
    const yCorner = 3 * Math.floor(row / 3)
    for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
            const [hx, hy] = [xCorner + k, yCorner + l]
            updatedHelper[hx][hy] = removeValueFromCell(updatedHelper[hx][hy], value)
        }
    }

    return updatedHelper
}
