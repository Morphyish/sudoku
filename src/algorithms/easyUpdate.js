export function easyUpdate(helper) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (helper[row][col].length === 1) {
                return {
                    solved: true,
                    value: helper[row][col][0],
                    coordinates: [row, col],
                }
            }
        }
    }

    return {
        solved: false,
    }
}
