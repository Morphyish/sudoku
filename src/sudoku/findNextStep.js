import { methods } from '../algorithms'
import { applyHelperSteps } from '../helper'

export function findNextStep(helpers) {
    for (const method of methods) {
        const step = method.algorithm(helpers)
        if (step) {
            if (step.helpers) {
                helpers = applyHelperSteps(helpers, step.helpers)
                const nextStep = findNextStep(helpers)
                if (nextStep) {
                    return {
                        helpers: [
                            ...step.helpers,
                            ...nextStep.helpers,
                        ],
                        grid: nextStep.grid,
                        methods: [
                            method.name,
                            ...nextStep.methods,
                        ],
                    }
                }

                return null
            }

            return {
                helpers: [],
                grid: step.grid,
                methods: [method.name],
            }
        }
    }

    return null
}
