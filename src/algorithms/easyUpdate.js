export function easyUpdate(helper) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (helper.getCell(col, row).length === 1) {
                return {
                    solved: true,
                    value: helper.getCell(col, row)[0],
                    coordinates: [row, col],
                }
            }
        }
    }

    return {
        solved: false,
        value: 0,
        coordinates: [],
    }
}
