<script context="module">
	const svglist = [
		'animate',
		'circle',
		'defs',
		'desc',
		'ellipse',
		'filter',
		'g',
		'image',
		'line',
		'marker',
		'mask',
		'metadata',
		'path',
		'pattern',
		'polygon',
		'polyline',
		'rect',
		'stop',
		'switch',
		'symbol',
		'svg',
		'text',
		'tspan',
		'use',
		'view'
	];
</script>

<script>
	import Anything from './Anything.svelte';
	import { ClassAndStyle } from './classAndStyle.js';
	import { refAction } from './refAction.js';
	import { EventAction } from './eventAction.js';
    import EscapeTagSvg from './EscapeTagSvg.svelte';
	export let tag,
		props,
		ref = undefined;
</script>

{#if svglist.includes(tag)}
	<EscapeTagSvg {tag} {props} {ref}>
		<Anything symbol={props?.children}>
			<slot />
		</Anything>
	</EscapeTagSvg>
{:else}
	<svelte:element this={tag} {...ClassAndStyle(props)} use:refAction={ref} use:EventAction={props}
		><Anything symbol={props?.children}>
			<slot />
		</Anything>
	</svelte:element>
{/if}
