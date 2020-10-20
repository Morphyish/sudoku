export function removeSymmetricalIndexes(grid, x, y) {
    const trimmedGrid = [...grid]

    const symX = trimmedGrid[0].length - 1 - x
    const symY = trimmedGrid.length - 1 - y

    trimmedGrid[y][x] = 0
    trimmedGrid[symY][symX] = 0

    return trimmedGrid
}
