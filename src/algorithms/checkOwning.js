export function checkOwning(helper, dryRun) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j += 3) {
            const ownInRow = checkSquare(helper, i, j)
            const takenInRow = findTaken(helper, ownInRow, i, j, dryRun)
            if (takenInRow.size > 0) {
                const rowsAnchor = 3 * Math.floor(i / 3)
                const square = `(${rowsAnchor + 1}, ${j + 1}) -> (${rowsAnchor + 3}, ${j + 3})`
                console.log(`${[...takenInRow]} taken in row ${i + 1} by square ${square}`)
                return {
                    solved: true,
                    value: 0,
                    coordinates: [],
                }
            }

            const ownInCol = checkSquare(helper, j, i)
            const takenInCol = findTaken(helper, ownInCol, j, i, dryRun)
            if (takenInCol.size > 0) {
                const rowAnchor = 3 * Math.floor(i / 3)
                const square = `(${j + 1}, ${rowAnchor + 1}) -> (${j + 3}, ${rowAnchor + 3})`
                console.log(`${[...takenInCol]} taken in col ${i + 1} by square ${square}`)
                return {
                    solved: true,
                    value: 0,
                    coordinates: [],
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

function checkSquare(helper, indexA, indexB) {
    const anchorA = 3 * Math.floor(indexA / 3)
    const anchorB = 3 * Math.floor(indexB / 3)
    let ownInLine = new Set()
    for (let b = anchorB; b < anchorB + 3; b++) {
        const own = new Set(helper.getCell(b, indexA))
        ownInLine = new Set([...ownInLine, ...own])
    }
    for (let a = anchorA; a < anchorA + 3; a++) {
        if (a === indexA) {
            continue
        }
        for (let b = anchorB; b < anchorB + 3; b++) {
            helper.getCell(b, a).forEach(n => ownInLine.delete(n))
        }
    }
    return ownInLine
}

function findTaken(helper, ownInLine, a, b, dryRun) {
    const taken = new Set()

    for (let i = 0; i < 6; i++) {
        const index = (b + i + 3) % 9
        ownInLine.forEach(num => {
            const cell = helper.getCell(index, a)
            if (!(cell.indexOf(num) >= 0)) {
                return
            }
            if (!dryRun) {
                helper.removeFromCell(index, a, num)
            }
            taken.add(num)
        })
    }

    return taken
}
