<script lang="ts">
	import { hook } from 'hooks-as-store';
	import { SvelteSlotInReact } from './symbol.js';
	import type { Interop } from './interop.js';
	import Anything from './Anything.svelte';
	import {useBeforeUpdateCoordinator} from './useBeforeUpdate.js';	
	import {classHook, isClassComponent} from './classHook';
	
	export let props: { [key: string]: any } = {},
		fc: (props: { [key: string]: any }) => undefined | null | string | Interop,
		noSlot = false,
		__$reactRefresher__ = undefined,
		ref=undefined;


	let propsWithChildren = noSlot
		? { ...props }
		: { children: SvelteSlotInReact, ...props };
	delete propsWithChildren.key;

	const coord = hook(useBeforeUpdateCoordinator);

	const r = hook(isClassComponent(fc)?classHook(fc):fc, propsWithChildren, ref);

	let first = true;
	const rerun = (props) => {
		if (!first) {
			propsWithChildren = noSlot
				? {...props}
				: { children: SvelteSlotInReact, ...props };
			delete propsWithChildren.key;
			r.run(propsWithChildren, ref);
		} else {
			first = false;
		}
	};

	$: rerun(props, __$reactRefresher__);
	

</script>

<Anything symbol={$r}><slot /></Anything>
