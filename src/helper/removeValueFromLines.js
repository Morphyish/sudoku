import { removeValueFromCell } from './removeValueFromCell'

export function removeValueFromLines(helper, col, row, value) {
    const updatedHelper = [...helper]

    for (let k = 0; k < 9; k++) {
        updatedHelper[col][k] = removeValueFromCell(updatedHelper[col][k], value)
        updatedHelper[k][row] = removeValueFromCell(updatedHelper[k][row], value)
    }

    return updatedHelper
}
