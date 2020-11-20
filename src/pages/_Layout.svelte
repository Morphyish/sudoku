<script>
    import { Title, Nav } from '../components'
</script>

<header class="noprint">
    <Title />
    <Nav />
</header>
<main>
    <slot />
</main>

<style>
    header {
        display: flex;
        justify-content: space-between;
        margin: .5rem 1rem 2rem 1rem;
    }

    main {
        display: flex;
        flex: 1;
        overflow: hidden;
    }

    @media screen and (max-width: 50rem) {
        header {
            flex-direction: column;
            margin: .5rem;
        }

        main {
            overflow: auto;
        }
    }
</style>
