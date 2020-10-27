import { methods } from '../algorithms'

export function findNextStep(helpers) {
    for (const method of methods) {
        const nextStep = method.algorithm(helpers)
        if (nextStep) {
            console.log(method.name)
            console.log(nextStep)
            return {
                method: method.name,
                nextStep,
            }
        }
    }

    console.log('No solution found!')

    return {
        nextStep: null,
    }
}
