export function initHelpers() {
    const helpers = []
    for (let i = 0; i < 9; i++) {
        const row = []
        for (let j = 0; j < 9; j++) {
            row.push([1, 2, 3, 4, 5, 6, 7, 8, 9])
        }
        helpers.push(row)
    }

    return helpers
}
