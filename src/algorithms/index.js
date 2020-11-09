import { easyUpdate } from './easyUpdate'
import { sectorUpdate } from './sectorUpdate'
import { checkPointingTuples } from './checkPointingTuples'
import { checkBoxLineReduction } from './checkBoxLineReduction'
import { checkNakedPair } from './checkNakedPair'
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
        name: 'Naked Pair',
        algorithm: checkNakedPair,
    },
    {
        name: 'Hidden Pair',
        algorithm: checkHiddenPair,
    },
    {
        name: 'Naked Tuple',
        algorithm: checkNakedTuple,
    },
    {
        name: 'Pointing Tuples',
        algorithm: checkPointingTuples,
    },
    {
        name: 'Box Line Reduction',
        algorithm: checkBoxLineReduction,
    },
]
