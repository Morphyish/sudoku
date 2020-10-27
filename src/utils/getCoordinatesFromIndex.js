export function getCoordinatesFromIndex(index) {
    const col = index % 9
    const row = index / 9 | 0

    return [col, row]
}
