<script>
    import { Layout, Router } from './pages'

    import { onMount } from 'svelte'
    import { grid, sudoku } from './stores'

    onMount(() => {
        const sudokuSnapshop = JSON.parse(localStorage.getItem('sudoku'))
        const gridSnapshop = JSON.parse(localStorage.getItem('grid'))

        if (sudokuSnapshop) {
            sudoku.set(sudokuSnapshop)
            grid.set(gridSnapshop)
        }
    })
</script>

<Layout>
    <Router />
</Layout>
