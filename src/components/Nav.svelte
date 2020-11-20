<script>
    import { Link } from '../router'

    let gameIsActive = false
    let newIsActive = false
</script>

<nav>
    <ul>
        <li class:active={gameIsActive} >
            <Link to="/" bind:active={gameIsActive}>Game</Link>
        </li>
        <li class:active={newIsActive} >
            <Link to="/new" bind:active={newIsActive}>New</Link>
        </li>
    </ul>
</nav>

<style>
    ul {
        display: flex;
        align-items: flex-end;
        list-style: none;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    li {
        margin: 0 .5rem;
        border-bottom: 2px solid transparent;
        transition: all 250ms;
    }

    li.active {
        border-bottom: 2px solid #ff3e00;
    }

    li :global(a) {
        display: inline-block;
        font-size: 1.125rem;
        color: #333;
        text-transform: uppercase;
        padding: .5rem .25rem;
    }

    li :global(a:hover),
    li :global(a:focus) {
        color: #ff3e00;
    }

    li :global(a:hover) {
        text-decoration: none;
    }

    @media screen and (max-width: 30rem) {
        li :global(a) {
            font-size: .825rem;
        }
    }
</style>
