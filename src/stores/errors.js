import { writable } from 'svelte/store'

function errorsStore() {
    const errors = writable(new Set())

    const reset = () => errors.set(new Set())

    return {
        ...errors,
        reset,
    }
}

export const errors = errorsStore()
