export function removeSymmetricalIndexes(grid, col, row) {
    const trimmedGrid = [...grid]

    const symCol = trimmedGrid[0].length - 1 - col
    const symRow = trimmedGrid.length - 1 - row

    trimmedGrid[row][col] = 0
    trimmedGrid[symRow][symCol] = 0

    return trimmedGrid
}
