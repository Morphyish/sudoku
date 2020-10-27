export function getCol(arr, num) {
    const result = []

    for (const row of arr) {
        result.push(row[num])
    }

    return result
}
