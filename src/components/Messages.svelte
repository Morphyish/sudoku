<script>
    import { sudoku } from '../stores'

    let error
    let success

    $: error = !$sudoku.isValid
    $: success = $sudoku.isDone
</script>

<p class="noprint" class:success class:error>
    {#if error}
            <strong>Something went wrong!</strong><br />
            The current board might not have a solution, or maybe our current algorithms can't solve it.<br />
    {:else if success}
            You won, congratulations!
    {/if}
</p>

<style>
    p {
        margin-top: 2rem;
    }

    .success {
        color: #4CAF50;
    }

    .error {
        color: #D13C2F;
    }
</style>
