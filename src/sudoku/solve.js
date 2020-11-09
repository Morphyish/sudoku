import { getHelpers } from '../helper'
import { clone } from '../utils'
import { findNextStep } from './findNextStep'
import { isDone } from './isDone'
import { applyGridStep } from './applyGridStep'

export function solve(grid) {
    let clonedGrid = clone(grid)

    const steps = []
    const methods = []

    while (!isDone(clonedGrid)) {
        let helpers = getHelpers(clonedGrid)
        const nextStep = findNextStep(helpers)
        if (nextStep) {
            steps.push(nextStep)
            methods.push(...nextStep.methods)

            clonedGrid = applyGridStep(clonedGrid, nextStep.grid)
        } else {
            return {
                isSolvable: false,
            }
        }
    }

    return {
        isSolvable: true,
        steps,
        methods,
    }
}
