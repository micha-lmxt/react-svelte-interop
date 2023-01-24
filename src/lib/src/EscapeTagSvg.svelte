<script>
	import { ClassAndStyle } from './classAndStyle.js';
	import { refAction } from './refAction.js';
	import { EventAction } from './eventAction.js';
	import { UpcasePropToDash } from './styleString.js';

	export let tag,
		props,
		ref = undefined;
    $: _props = tag==="svg"?ClassAndStyle(props):UpcasePropToDash(ClassAndStyle(props))
</script>
<svelte:options namespace="svg"/>
<svelte:element
	this={tag}
	{..._props}
	use:refAction={ref}
	use:EventAction={props}
	><slot />
</svelte:element>
