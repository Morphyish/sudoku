import { getCell } from '../utils'

export function easyUpdate(helpers) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const values = getCell(helpers, col, row)
            if (values.length === 1) {
                return {
                    grid: [{
                        col,
                        row,
                        value: values[0],
                    }],
                }
            }
        }
    }

    return null
}
