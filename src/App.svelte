<script>
    import { Board, History, Settings, Messages, Actions, Title } from './components'

    import { onMount } from 'svelte'
    import { sudoku } from './stores'

    onMount(() => {
        sudoku.load()
    })
</script>

<Title />
<main>
    <div class="game">
        <Settings />
        <Board />

        <Messages />
        <Actions />
    </div>
    <History />
</main>

<style>
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

    @media screen and (max-width: 50rem) {
        main {
            overflow: auto;
        }
    }
</style>
