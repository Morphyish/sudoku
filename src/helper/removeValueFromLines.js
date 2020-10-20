import { removeValueFromCell } from './removeValueFromCell'

export function removeValueFromLines(helper, x, y, value) {
    const updatedHelper = [...helper]

    for (let k = 0; k < 9; k++) {
        updatedHelper[x][k] = removeValueFromCell(updatedHelper[x][k], value)
        updatedHelper[k][y] = removeValueFromCell(updatedHelper[k][y], value)
    }

    return updatedHelper
}
