export function shift(arr, ite) {
    if (ite < 1) {
        return arr
    }

    const shiftedArray = [...arr]

    const shiftedValue = shiftedArray.splice(-1)
    shiftedArray.unshift(...shiftedValue)

    return shift(shiftedArray, ite - 1)
}
