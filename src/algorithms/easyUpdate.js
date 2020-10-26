export function easyUpdate(helper) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (helper.getCell(col, row).length === 1) {
                return {
                    grid: [{
                        col,
                        row,
                        value: helper.getCell(col, row)[0],
                    }],
                }
            }
        }
    }

    return null
}
