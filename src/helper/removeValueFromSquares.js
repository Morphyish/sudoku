import { removeValueFromCell } from './removeValueFromCell'

export function removeValueFromSquares(helper, x, y, value) {
    const updatedHelper = [...helper]

    const xCorner = 3 * Math.floor(x / 3)
    const yCorner = 3 * Math.floor(y / 3)
    for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
            const [hx, hy] = [xCorner + k, yCorner + l]
            updatedHelper[hx][hy] = removeValueFromCell(updatedHelper[hx][hy], value)
        }
    }

    return updatedHelper
}
