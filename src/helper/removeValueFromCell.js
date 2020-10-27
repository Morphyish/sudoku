export function removeValueFromCell(cell, value) {
    const index = cell.indexOf(value)
    if (index >= 0) {
        cell.splice(index, 1)
    }
}
