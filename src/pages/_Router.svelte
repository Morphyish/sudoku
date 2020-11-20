<script>
    import { Route } from '../router'
    import { Game } from './game'
    import { New } from './new'
</script>

<Route path="/" component={Game} />
<Route path="/new" component={New} />
