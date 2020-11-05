<script>
    import Button from './Button.svelte'

    import { sudoku } from '../../stores'
</script>

<div class="actions noprint">
    <Button on:click={sudoku.empty}>Empty</Button>
    <Button on:click={sudoku.start}>New grid</Button>
    <Button on:click={sudoku.restart}>Restart</Button>
    <Button on:click={sudoku.solveNextStep}>Solve next step</Button>
    <Button on:click={sudoku.solveAll}>Solve</Button>
    <Button on:click={sudoku.save}>Save</Button>
</div>

<style>
    .actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>
