export function switchColumns(grid, indexA, indexB) {
    const result = []

    for(const row of grid) {
        const cellA = row[indexA]
        const cellB = row[indexB]

        const updatedRow = [...row]
        updatedRow.splice(indexA, 1, cellB)
        updatedRow.splice(indexB, 1, cellA)

        result.push(updatedRow)
    }

    return result
}
