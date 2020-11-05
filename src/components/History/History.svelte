<script>
    import Entry from './Entry.svelte'

    import { afterUpdate } from 'svelte'
    import { history } from '../../stores'

    let entriesList
    let entries = []

    afterUpdate(() => {
        let currentStep = $history.currentStep !== null ? $history.currentStep : entries.length - 1
        const entry = entries[currentStep]
        if (entriesList && entry) {
            const listHeight = entriesList.offsetHeight
            const entryHeight = entry.offsetHeight
            const entryPosition = entry.offsetTop
            entriesList.scrollTop = entryPosition - (listHeight / 2 - entryHeight / 2)
        }
    })
</script>

{#if $history.entries && $history.entries.length}
    <aside class="noprint">
        <h2>History</h2>
        <div class="entries" bind:this={entriesList}>
            {#each $history.entries as entry, step}
                <Entry
                        {entry}
                        open={$history.currentStep === step}
                        bind:element={entries[step]}
                        on:click={() => history.toggleEntry(step)}
                />
            {/each}
        </div>
    </aside>
{/if}

<style>
    aside {
        display: flex;
        flex-direction: column;
        width: 20rem;
    }

    h2 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 1.25rem;
        font-weight: 400;
        margin-top: 0;
        padding: 0 8px;
    }

    .entries {
        position: relative;
        flex: 1;
        overflow: auto;
        padding: 0 8px;
    }

    @media screen and (max-width: 50rem) {
        aside {
            display: none;
        }
    }
</style>
