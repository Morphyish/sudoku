import { shuffle } from '../utils'
import { create } from './create'

describe('sudoku/create', () => {
    it('should generate a grid', () => {
        shuffle.mockImplementation(() => ([1, 2, 3, 4, 5, 6, 7, 8, 9]))

        const grid = create()

        expect(grid).toEqual([
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [7, 8, 9, 1, 2, 3, 4, 5, 6],
            [4, 5, 6, 7, 8, 9, 1, 2, 3],
            [9, 1, 2, 3, 4, 5, 6, 7, 8],
            [6, 7, 8, 9, 1, 2, 3, 4, 5],
            [3, 4, 5, 6, 7, 8, 9, 1, 2],
            [8, 9, 1, 2, 3, 4, 5, 6, 7],
            [5, 6, 7, 8, 9, 1, 2, 3, 4],
            [2, 3, 4, 5, 6, 7, 8, 9, 1],
        ])
    })
})

jest.mock('../utils', () => ({
    ...jest.requireActual('../utils'),
    shuffle: jest.fn(),
}))
