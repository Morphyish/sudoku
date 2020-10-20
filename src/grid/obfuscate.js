import { rotate, switchColumns, switchRows } from '../utils'

export function obfuscate(grid) {
    let obfuscatedGrid = grid

    obfuscatedGrid = switchRows(obfuscatedGrid, 1, 2)
    obfuscatedGrid = switchRows(obfuscatedGrid, 4, 3)
    obfuscatedGrid = switchRows(obfuscatedGrid, 6, 8)

    obfuscatedGrid = switchColumns(obfuscatedGrid, 1, 2)
    obfuscatedGrid = switchColumns(obfuscatedGrid, 4, 3)
    obfuscatedGrid = switchColumns(obfuscatedGrid, 6, 8)

    obfuscatedGrid = rotate(obfuscatedGrid, 1)

    return obfuscatedGrid
}
