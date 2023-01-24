import type { SvelteComponent } from "svelte";
import { createUniqueId } from "./createUniqueId.js";
import { Interop } from "./interop.js";

export const toReact = (component: typeof SvelteComponent, props?: any,name?:string,withRefresher=false) => {
    return new Interop(component,props||{},(p,q)=>({type:component,props:p,key:p.key}),
    name||createUniqueId(),withRefresher);
}
