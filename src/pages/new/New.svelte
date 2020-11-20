<script>
    import { Button } from '../../components'
    import { sudoku } from '../../stores'
</script>

<section>
    <Button disabled={$sudoku.loading} on:click={sudoku.start}>New grid</Button>
    <Button disabled={$sudoku.loading} on:click={sudoku.empty}>Empty grid</Button>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
    }
</style>
