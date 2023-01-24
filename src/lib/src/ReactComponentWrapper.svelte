<script lang="ts">
	import EscapeTag from './EscapeTag.svelte';
	import ReactComponent from './ReactComponent.svelte';

	export let props: { [key: string]: any } = {},
		fc: (props: { [key: string]: any }) => undefined | null | string | Interop,
		noSlot = false,
		__$reactRefresher__ = undefined,
		displayName = '';
	let ofc = fc;
	let fccount = 0;
	$: if (ofc!==fc){
		console.log("Wrapper fc change",ofc.name,fc.name)
		fccount++;
		ofc=fc;
	}
	$: key = (props?.key||"") + (typeof fc==="function"?fccount:"");
	
	$: ref = props.ref;

	export const getDisplayName = displayName;
</script>

{#if typeof fc !== 'function'}
	<EscapeTag {props} {ref} tag={fc}><slot /></EscapeTag>
{:else}
	{#key key}
		<ReactComponent
			props={{ ...props, key: undefined }}
			{fc}
			{noSlot}
			{__$reactRefresher__}
			{ref}
		/>
	{/key}
{/if}
