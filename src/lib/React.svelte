<script lang="ts">
    import {hook} from 'hooks-as-store';
    import {onDestroy} from 'svelte';
    import {SvelteSlotInReact} from './symbol.js';
    export let props:{[key:string]:any}={},
        fc : (props:{[key:string]:any})=>(undefined|null|string|{type:"ReactJSX",component:SvelteComponent,props:{[key:string]:any}});
    let propsWithChildren = {children:SvelteSlotInReact,...props}
    
    const r = hook(fc,propsWithChildren);
    let first=true;
    $: if (!first){
        propsWithChildren = {children:SvelteSlotInReact,...props}
        r.update(propsWithChildren);
    } else{
        first=false;
    }
    let component,_props={},isComponent=false;
    const unsubscribe = r.subscribe(c=>{
            if (c && c.component){     
                component = c.component;
                _props = c.$props;
                isComponent=true;
            }else{
                props={};
                component = c;        
                isComponent=false;
            }
        })
    onDestroy(unsubscribe)
</script>
{#if isComponent}
<svelte:component this={component} {..._props}>
    <slot></slot>
</svelte:component>
{:else}
{component}
{/if}
