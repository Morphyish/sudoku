<script>
    import { sudoku } from '../stores'
</script>

{#if $sudoku.tip}
    <p>
        The next step is solved using the {$sudoku.tip} method.
    </p>
{/if}
