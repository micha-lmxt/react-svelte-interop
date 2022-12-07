<script>
    import {SvelteSlotInReact} from './symbol.js'
    export let symbol;
</script>

{#if symbol && symbol.$sig==="ReactJSX"}
    <svelte:component this={symbol.component} {...(symbol.$props||{})}><slot/></svelte:component>
{:else if symbol && Array.isArray(symbol)}
    {#each symbol as s}
        <svelte:self symbol={s}><slot/></svelte:self>
    {/each}
{:else if symbol===SvelteSlotInReact}
    <slot/>
{:else if symbol}
    {symbol}
{/if}