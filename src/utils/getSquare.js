export function getSquare(arr, num) {
    const result = []

    const rowAnchor = 3 * Math.floor(num / 3)
    const colAnchor = 3 * (num % 3)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            result.push(arr[rowAnchor + i][colAnchor + j])
        }
    }

    return result
}
