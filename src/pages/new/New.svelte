<script>
    import { GridFactory } from '../../../workers'
    import { Button } from '../../components'
    import { navigate } from '../../router'
    import { errors, grid, history, sudoku } from '../../stores'
    import Link from '../../router/Link.svelte'

    let logs = []
    let result = null

    const createEmptyBoard = () => {
        errors.reset()
        history.reset()
        grid.reset()
        sudoku.reset()
        navigate('/')
    }

    const createNewBoard = () => {
        errors.reset()
        history.reset()

        sudoku.update(state => ({
            ...state,
            loading: true,
        }))

        const factory = new GridFactory()
        factory.onprogress = ({ message }) => {
            logs = [...logs, message]
        }
        factory.onsuccess = ({ grid: newGrid, methods, difficulty, nbOfCells }) => {
            result = { methods, difficulty, nbOfCells }

            grid.set(newGrid)
            sudoku.start(newGrid, difficulty, methods)
        }
        factory.start()
    }
</script>

<section>
    <Button disabled={$sudoku.loading} on:click={createEmptyBoard}>Empty grid</Button>
    <Button disabled={$sudoku.loading} on:click={createNewBoard}>New grid</Button>
    <div>
        {#each logs as log}
            <p>{log}</p>
        {/each}
        {#if result}
            <p>
                <strong>methods :</strong> {result.methods}<br />
                <strong>difficulty :</strong> {result.difficulty}<br />
                <strong>nbOfCells :</strong> {result.nbOfCells}
            </p>
            <Link to="/">Let's go!</Link>
        {/if}
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
    }
</style>
