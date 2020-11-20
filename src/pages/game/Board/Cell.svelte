<script>
    import Helper from './Helper.svelte'

    export let col = 0
    export let row = 0
    export let cell = 0
    export let helpers = []
    export let hasError = false
    export let isFocused = false
    export let startingCell = false
    export let highlighted = false
    export let showErrors = false
    export let showHelpers = false
    export let element = null
</script>

<div
        class="cell"
        aria-label={`Column ${col} Row ${row}`}
        class:thickRightBorder={col % 3 === 2}
        class:thickBottomBorder={row % 3 === 2}
        class:rightmostCell={col === 8}
        class:bottommostCell={row === 8}
        class:error={hasError && showErrors && !startingCell}
        class:startingCell
        class:highlighted
        class:isFocused
        bind:this={element}
        on:focus
        on:blur
        on:keydown tabindex="-1"
>
    {#if cell}
        {cell}
    {:else if showHelpers}
        <Helper values={helpers} />
    {/if}
</div>

<style>
    .cell {
        height: 3rem;
        width: 3rem;
        font-size: 2rem;
        color: #333;
        text-align: center;
        line-height: 3rem;
        border-right: 1px solid #d7d7d7;
        border-bottom: 1px solid #d7d7d7;
        font-weight: 100;
        cursor: pointer;
    }

    .thickRightBorder {
        border-right: 1px solid #333;
    }

    .thickBottomBorder {
        border-bottom: 1px solid #333;
    }

    .rightmostCell {
        border-right: 0;
    }

    .bottommostCell {
        border-bottom: 0;
    }

    .isFocused {
        outline-style: auto;
    }

    .highlighted {
        background: rgba(255, 62, 0, .3);
    }

    .startingCell {
        font-weight: 400;
    }

    .error {
        color: #D13C2F;
    }

    @media screen and (max-width: 30rem) {
        .cell {
            height: 2rem;
            width: 2rem;
            font-size: 1.5rem;
            line-height: 2rem;
        }
    }
</style>
