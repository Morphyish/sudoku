import { easyUpdate } from './easyUpdate'
import { sectorUpdate } from './sectorUpdate'
import { checkIntersectionRemoval } from './checkIntersectionRemoval'
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
        name: 'Naked Tuple',
        algorithm: checkNakedTuple,
    },
    {
        name: 'Hidden Pair',
        algorithm: checkHiddenPair,
    },
    {
        name: 'Intersection Removal',
        algorithm: checkIntersectionRemoval,
    },
]
