<script>
    import { Messages } from '../../components'
    import { Board } from './Board'
    import { History } from './History'
    import Actions from './Actions.svelte'
    import Settings from './Settings.svelte'
</script>

<section>
    <div class="game">
        <Settings />
        <Board />

        <Messages />
        <Actions />
    </div>
    <History />
</section>

<style>
    section {
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
        section {
            overflow: auto;
        }
    }
</style>
