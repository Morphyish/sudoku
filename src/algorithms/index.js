import { easyUpdate } from './easyUpdate'
import { sectorUpdate } from './sectorUpdate'
import { checkPointingTuples } from './checkPointingTuples'
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
        name: 'Pointing Tuples',
        algorithm: checkPointingTuples,
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
