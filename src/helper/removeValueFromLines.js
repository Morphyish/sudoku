import { removeValueFromCell } from './removeValueFromCell'

export function removeValueFromLines(helper, col, row, value) {
    for (let k = 0; k < 9; k++) {
        removeValueFromCell(helper[k][col], value)
        removeValueFromCell(helper[row][k], value)
    }
}
