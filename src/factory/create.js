import { shift, shuffle } from '../utils'

export function create() {
    const seed = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const grid = []

    const initialRow = shuffle(seed)
    grid.push(initialRow)

    let shiftedRow = shift(initialRow, 3)
    grid.push(shiftedRow)
    shiftedRow = shift(shiftedRow, 3)
    grid.push(shiftedRow)

    shiftedRow = shift(initialRow, 1)
    grid.push(shiftedRow)
    shiftedRow = shift(shiftedRow, 3)
    grid.push(shiftedRow)
    shiftedRow = shift(shiftedRow, 3)
    grid.push(shiftedRow)

    shiftedRow = shift(initialRow, 2)
    grid.push(shiftedRow)
    shiftedRow = shift(shiftedRow, 3)
    grid.push(shiftedRow)
    shiftedRow = shift(shiftedRow, 3)
    grid.push(shiftedRow)

    return grid
}
