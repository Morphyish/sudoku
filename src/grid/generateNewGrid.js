import { create } from './create'
import { empty } from './empty'
import { obfuscate } from './obfuscate'

export function generateNewGrid() {
    const newGrid = create()
    const obfuscatedGrid = obfuscate(newGrid)

    let i = 0
    let grid
    let methods = []
    let difficulty = 0
    let nbOfCells = 0

    do {
        const result = empty(obfuscatedGrid)
        grid = result.grid
        methods = [...new Set(result.methods)]
        difficulty = methods.length
        nbOfCells = result.nbOfCells
        i++
    } while (difficulty < 4 && i < 100)

    return {
        grid,
        methods,
        difficulty,
        nbOfCells,
    }
}
