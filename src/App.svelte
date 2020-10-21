<script>
	import Grid from './components/Grid.svelte'
	import Tip from './components/Tip.svelte'
	import NextStep from './components/NextStep.svelte'

	import { onMount } from 'svelte'
	import { grid, sudoku } from './stores'

	onMount(() => {
		sudoku.load()
	})
</script>

<main>
	<h1>Sudoku</h1>
	{#if $sudoku.isDone}
		<p class="success">You won, congratulations!</p>
	{/if}
	{#if !$sudoku.isValid}
		<p class="error">You have at least 1 error</p>
	{/if}
	{#if $grid}
		<Grid />
	{/if}
	<div class="buttons">
		<button on:click={sudoku.start}>Generate new grid</button>
		<button on:click={grid.trim}>Remove numbers</button>
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
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.success {
		color: #4CAF50;
	}

	.error {
		color: #D13C2F;
	}

	.buttons {
		margin-top: 2rem;
	}

	button {
		text-transform: uppercase;
	}

	button + button {
		margin-left: 2rem;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
