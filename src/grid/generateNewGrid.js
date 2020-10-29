import { create } from './create'
import { empty } from './empty'
import { obfuscate } from './obfuscate'

export function generateNewGrid() {
    const newGrid = create()
    const obfuscatedGrid = obfuscate(newGrid)
    const { grid, methods } = empty(obfuscatedGrid)

    const uniqueMethods = [...new Set(methods)]

    return {
        grid,
        methods: uniqueMethods,
    }
}
