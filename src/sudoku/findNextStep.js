import { methods } from '../algorithms'

export function findNextStep(helpers) {
    for (const method of methods) {
        const nextStep = method.algorithm(helpers)
        if (nextStep) {
            return {
                method: method.name,
                nextStep,
            }
        }
    }

    return {
        nextStep: null,
    }
}
