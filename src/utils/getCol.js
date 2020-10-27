export function getCol(num, arr) {
    const result = []

    for (const row of arr) {
        result.push(row[num])
    }

    return result
}
