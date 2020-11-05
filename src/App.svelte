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
    }

    .game {
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: center;
        padding: 0 .5rem .5rem .5rem;
    }

    @media screen and (max-width: 50rem) {
        main {
            overflow: auto;
        }
    }
</style>
