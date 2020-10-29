<script>
    import Board from './components/Board.svelte'
    import History from './components/History.svelte'
    import Button from './components/Button.svelte'
    import Toggle from './components/Toggle.svelte'

    import { onMount } from 'svelte'
    import { settings, sudoku } from './stores'

    onMount(() => {
        sudoku.load()
    })
</script>

<h1>Sudoku</h1>
<main>
    <div class="game">
        {#if $sudoku.isDone}
            <p class="success">You won, congratulations!</p>
        {/if}
        {#if !$sudoku.isValid}
            <p class="error">
                <strong>Something went wrong!</strong><br />
                The current board might not have a solution, or maybe our current algorithms can't solve it.<br />
            </p>
        {/if}

        <Board />

        <div class="settings">
            <Toggle checked={$settings.showErrors} on:click={settings.toggleErrors}>Show errors</Toggle>
            <Toggle checked={$settings.showHelpers} on:click={settings.toggleHelpers}>Show helpers</Toggle>
        </div>

        <div class="actions">
            <Button on:click={sudoku.start}>New grid</Button>
            <Button on:click={sudoku.restart}>Restart</Button>
            <Button on:click={sudoku.solveNextStep}>Solve next step</Button>
            <Button on:click={sudoku.solveAll}>Solve</Button>
            <Button on:click={sudoku.save}>Save</Button>
        </div>
    </div>
    <History />
</main>

<style>
    h1 {
        color: #ff3e00;
        text-align: center;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    main {
        display: flex;
        flex: 1;
        overflow: hidden;
        padding: 8px 0;
    }

    .game {
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: center;
        padding: 0 8px;
    }

    .success {
        color: #4CAF50;
    }

    .error {
        color: #D13C2F;
    }

    .settings,
    .actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 2rem;
    }
</style>
