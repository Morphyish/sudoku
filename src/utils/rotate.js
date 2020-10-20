export function rotate(grid, ite, counterclockwise = false) {
    if (ite < 1) {
        return grid
    }

    const originGrid = [...grid]
    const rotatedGrid = []

    while (originGrid.length) {
        const [row] = originGrid.splice(counterclockwise ? 0 : -1, 1)

        if (counterclockwise) {
            row.reverse()
        }

        row.forEach((cell, index) => {
            if (!rotatedGrid[index]) {
                rotatedGrid[index] = []
            }

            rotatedGrid[index].push(cell)
        })
    }

    return rotate(rotatedGrid, ite - 1, counterclockwise)
}
