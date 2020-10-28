import { writable } from 'svelte/store'

const initialState = {
    entries: [],
    currentStep: 0,
}

function historyStore() {
    const history = writable(initialState)

    const addEntry = entry => {
        history.update(snapshot => ({
            ...snapshot,
            entries: [...snapshot.entries, entry],
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

    const goToNextStep = () => {
        history.update(snapshot => {
            const nextStep = snapshot.currentStep + 1
            if (nextStep < snapshot.entries.length) {
                return {
                    ...snapshot,
                    currentStep: nextStep,
                }
            }

            return snapshot
        })
    }

    const goToLastStep = () => {
        history.update(snapshot => ({
            ...snapshot,
            currentStep: snapshot.entries.length - 1,
        }))
    }

    const reset = () => {
        history.set(initialState)
    }

    return {
        ...history,
        addEntry,
        goToStep,
        goToNextStep,
        goToLastStep,
        reset,
    }
}

export const history = historyStore()
