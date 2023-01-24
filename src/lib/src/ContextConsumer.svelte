<script>
    import {getContext} from 'svelte';
    import Anything from './Anything.svelte';
    export let children,
        context;
    const value = getContext(context);
    export const getDisplayName = context.displayName;
</script>
<Anything symbol={children($value)}><slot/></Anything>
