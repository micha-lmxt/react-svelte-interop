<script>
    import {writable,get} from 'svelte/store';
    import {setContext} from 'svelte';
    import Anything from './Anything.svelte';
    
    export let context,
        value,
        children;
    const walue = writable(value);
    setContext(context,walue);
    $: {

        if ($walue !== value){
            $walue = value;
        }
    }
    export const getContext = ()=>walue;
    export const getValue = ()=>get(walue);
    export const getDisplayName = ()=>context.displayName;
</script>
<Anything symbol={children}><slot/></Anything>