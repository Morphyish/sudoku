<script>
    import { Board, History, Settings, Messages, Actions } from './components'

    import { onMount } from 'svelte'
    import { sudoku } from './stores'

    onMount(() => {
        sudoku.load()
    })
</script>

<h1 class="noprint">Sudoku Trainer</h1>
<main>
    <div class="game">
        <Board />

        <Messages />

        <Settings />
        <Actions />
    </div>
    <History />
</main>

<style>
    h1 {
        margin: .5rem 1rem 2rem 1rem;
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 2em;
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
        flex: 1;
        align-items: center;
        padding: 0 8px;
    }
</style>
