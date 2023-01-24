<script>
import Anything from './Anything.svelte';
export let children;
</script>
<Anything symbol={children}><slot/></Anything>