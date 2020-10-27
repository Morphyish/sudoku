import { writable } from 'svelte/store'

function historyStore() {
    const history = writable(null)

    return {
        ...history,
    }
}

export const history = historyStore()
