import { writable } from 'svelte/store'

const initialState = {
    entries: [],
    currentStep: null,
}

function historyStore() {
    const history = writable(initialState)

    const addEntry = entry => {
        history.update(snapshot => ({
            entries: [...snapshot.entries, entry],
            currentStep: null,
        }))
    }

    const goToStep = step => {
        history.update(snapshot => {
            if (step >= 0 && step < snapshot.entries.length) {
                return {
                    ...snapshot,
                    currentStep: step,
                }
            }

            return snapshot
        })
    }

    const reset = () => {
        history.set(initialState)
    }

    return {
        ...history,
        addEntry,
        goToStep,
        reset,
    }
}

export const history = historyStore()
