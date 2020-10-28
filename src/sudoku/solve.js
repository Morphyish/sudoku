import { initHelpers, updateHelpers } from '../helper'
import { clone } from '../utils'
import { findNextStep } from './findNextStep'
import { isDone } from './isDone'
import { applyStep } from './applyStep'

export function solve(grid) {
    let clonedGrid = clone(grid)

    const steps = []
    let helpers = initHelpers()
    helpers = updateHelpers(helpers, clonedGrid)

    while (!isDone(clonedGrid)) {
        const nextStep = findNextStep(helpers)
        if (nextStep) {
            steps.push(nextStep)
            const { grid: updatedGrid , helpers: updatedHelpers } = applyStep(clonedGrid, helpers, nextStep)
            clonedGrid = updatedGrid
            helpers = updatedHelpers
        } else {
            return {
                isSolvable: false,
            }
        }
    }

    return {
        isSolvable: true,
        steps,
    }
}
