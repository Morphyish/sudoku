import { writable } from 'svelte/store'
import { initHelpers } from '../helper'
import { clone, setCell as genericSetCell } from '../utils'

const initialState = initHelpers()

function helperStore() {
    const helper = writable(initialState)

    const reset = () => helper.set(initialState)

    const setCell = (col, row, values) => {
        helper.update(snapshot => {
            const clonedHelper = clone(snapshot)
            genericSetCell(clonedHelper, col, row, values)

            return clonedHelper
        })
    }

    return {
        ...helper,
        setCell,
        reset,
    }
}

export const helper = helperStore()
