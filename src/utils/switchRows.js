export function switchRows(grid, indexA, indexB) {
    const updatedGrid = [...grid]

    const rowA = grid[indexA]
    const rowB = grid[indexB]

    updatedGrid.splice(indexA, 1, rowB)
    updatedGrid.splice(indexB, 1, rowA)

    return updatedGrid
}
