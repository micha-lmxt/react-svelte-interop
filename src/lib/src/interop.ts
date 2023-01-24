
import type { SvelteComponent } from "svelte"
import type { SvelteComponentDev } from "svelte/internal";
import { getProps } from './getProps.js';

const flatten = (prs:any) =>{
    if (Array.isArray(prs)) {
        prs = prs.flat(2);
        if (prs.length === 1)
            return prs[0]
    }
    return prs;
}


class Interop {
    $props: { [key: string]: any }
    $sig = 'ReactJSX'
    $uniqueId:string
    component: typeof SvelteComponent | typeof SvelteComponentDev
    $propfun: (p: any, q: any) => any
    
    constructor(comp: typeof SvelteComponent | typeof SvelteComponentDev, props: { [key: string]: any },
        propfun: (p: any, q: any) => any,uniqueId:string,withRefresher=true) {
        this.component = comp;
        this.$props = props;
        if (withRefresher )
            this.$props.__$reactRefresher__ = props?.fc?.___memo__?null:Symbol(); 
        this.$propfun = propfun;
        this.$uniqueId = uniqueId;    
        
    }
    get props() {
        const prs = flatten(this.$propfun(this.$props, getProps));
        
        if (prs && prs.props){
            return prs.props;
        }
        return prs;
    }
    get type() {        
        let prs = flatten(this.$propfun(this.$props, getProps));
        if (prs && prs.type) {
            return prs.type
        }
        return typeof prs;
    }
    get key(){
        let prs = flatten(this.$propfun(this.$props, getProps));
        if (prs && prs.props && prs.props.key) {
            return prs.props.key;
        }
        return undefined
    }
}

export { Interop }