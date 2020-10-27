import { removeValueFromCell } from './removeValueFromCell'

export function removeValueFromSquares(helper, col, row, value) {
    const xCorner = 3 * Math.floor(col / 3)
    const yCorner = 3 * Math.floor(row / 3)
    for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
            const [x, y] = [xCorner + k, yCorner + l]
            removeValueFromCell(helper[y][x], value)
        }
    }
}
