import type { SvelteComponent } from "svelte"
import type { SvelteComponentDev } from "svelte/internal";
import { getProps } from './getProps.js';

class Interop {
    $props: { [key: string]: any }
    $sig = 'ReactJSX'
    component: SvelteComponent | SvelteComponentDev
    $propfun:(p:any,q:any)=>any
    constructor(comp: SvelteComponent | SvelteComponentDev, props: { [key: string]: any }, 
        propfun:(p:any,q:any)=>any) {
        this.component = comp;
        this.$props = props;
        this.$propfun=propfun;
    }
    get props(){
        return this.$propfun(this.$props,getProps);
    }
}

export { Interop }