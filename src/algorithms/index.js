import { easyUpdate } from './easyUpdate'
import { sectorUpdate } from './sectorUpdate'
import { checkSquareOwning } from './checkSquareOwning'
import { checkNakedTuple } from './checkNakedTuple'
import { checkHiddenPair } from './checkHiddenPair'

export const methods = [
    {
        name: 'Easy Update',
        algorithm: easyUpdate,
    },
    {
        name: 'Sector Update',
        algorithm: sectorUpdate,
    },
    {
        name: 'Square Owning',
        algorithm: checkSquareOwning,
    },
    {
        name: 'Naked Tuple',
        algorithm: checkNakedTuple,
    },
    {
        name: 'Hidden Pair',
        algorithm: checkHiddenPair,
    },
]
