<script>
    import { sudoku } from '../stores'
</script>

{#if $sudoku.nextStep}
    <p>
        Next Step<br />
        value: {$sudoku.nextStep.value}<br />
        column: {$sudoku.nextStep.coordinates[0]}<br />
        row: {$sudoku.nextStep.coordinates[1]}
    </p>
{/if}
