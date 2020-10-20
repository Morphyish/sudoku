export function easyUpdate(helper) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (helper[i][j].length === 1) {
                return {
                    solved: true,
                    value: helper[i][j][0],
                    coordinates: [i, j],
                }
            }
        }
    }

    return {
        solved: false,
        value: 0,
        coordinates: [-1, -1],
    }
}
