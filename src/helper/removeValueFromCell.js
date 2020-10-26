import { clone } from '../utils'

export function removeValueFromCell(cell, value) {
    const updatedCell = clone(cell)

    const index = updatedCell.indexOf(value)
    if (index >= 0) {
        updatedCell.splice(index, 1)
    }

    return updatedCell
}
