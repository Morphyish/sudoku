<script>
    import Grid from './components/Grid.svelte'
    import History from './components/History.svelte'
    import Tip from './components/Tip.svelte'
    import NextStep from './components/NextStep.svelte'

    import { onMount } from 'svelte'
    import { grid, sudoku } from './stores'

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
        {#if $grid}
            <Grid />
        {/if}
        <div class="buttons">
            <button on:click={sudoku.start}>Generate new grid</button>
            <button on:click={sudoku.validate}>Validate grid</button>
            <button on:click={sudoku.toggleHelpers}>Toggle helpers</button>
            <button on:click={sudoku.getTip}>Get tip</button>
            <button on:click={sudoku.getNextStep}>Show next step</button>
            <button on:click={sudoku.solveNextStep}>Solve next step</button>
            <button on:click={sudoku.solveAll}>Solve</button>
            <button on:click={sudoku.save}>Save</button>
        </div>
        <Tip />
        <NextStep />
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
		align-items: center;
        padding: 0 8px;
	}

    .success {
        color: #4CAF50;
    }

    .error {
        color: #D13C2F;
    }

    .buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 2rem;
        margin-left: -2rem;
    }

    button {
        text-transform: uppercase;
        margin-left: 2rem;
    }
</style>
