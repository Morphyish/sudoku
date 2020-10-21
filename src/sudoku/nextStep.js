import { checkHiddenTuple, checkNakedTuple, checkOwning, easyUpdate, sectorUpdate } from '../algorithms'

export function nextStep(helper, dryRun = false) {
    const methods = [
        {
            name: 'Easy Update',
            algorithm: easyUpdate,
        },
        {
            name: 'Sector Update',
            algorithm: sectorUpdate,
        },
        {
            name: 'Check Owning',
            algorithm: checkOwning,
        },
        {
            name: 'Check Naked Tuple',
            algorithm: checkNakedTuple,
        },
        {
            name: 'Check Hidden Tuple',
            algorithm: checkHiddenTuple,
        },
    ]

    for (const method of methods) {
        const { solved, ...result } = method.algorithm(helper, dryRun)
        console.log(method.name, solved)
        if (solved) {
            return {
                solved,
                method: method.name,
                ...result
            }
        }
    }

    return {
        solved: false,
        value: 0,
        coordinates: [],
    }
}
