<script>
    import Anything from '../Anything.svelte';
    import {portal} from 'svelte-portal';
  /**
   * DOM Element or CSS Selector
   * @type { HTMLElement|string}
   */
  export let target = "body",
    children;
</script>

<div use:portal={target} hidden>
  <Anything symbol={children}><slot/></Anything>
</div>