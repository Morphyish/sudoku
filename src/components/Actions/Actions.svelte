<script>
    import Button from './Button.svelte'

    import { sudoku } from '../../stores'
</script>

<div class="actions noprint">
    <Button disabled={$sudoku.loading} on:click={sudoku.empty}>Empty</Button>
    <Button disabled={$sudoku.loading} on:click={sudoku.start}>New grid</Button>
    <Button disabled={$sudoku.loading} on:click={sudoku.restart}>Restart</Button>
    <Button disabled={$sudoku.loading} on:click={sudoku.solveNextStep}>Solve next step</Button>
    <Button disabled={$sudoku.loading} on:click={sudoku.solveAll}>Solve</Button>
    <Button disabled={$sudoku.loading} on:click={sudoku.save}>Save</Button>
</div>

<style>
    .actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>
