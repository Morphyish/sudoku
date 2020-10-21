<script>
    import { sudoku } from '../stores'
</script>

{#if $sudoku.nextStep}
    <p>
        Next Step<br />
        row: {$sudoku.nextStep.coordinates.row}<br />
        column: {$sudoku.nextStep.coordinates.col}<br />
        value: {$sudoku.nextStep.value}
    </p>
{/if}
