import type { SvelteComponent } from "svelte";
import { Interop } from "./interop.js";

export const toReact = (component: SvelteComponent, props?: any) => {
    return new Interop(component,props||{},(p,q)=>({type:component,props:p}));
}