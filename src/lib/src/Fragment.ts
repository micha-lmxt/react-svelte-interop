import { Interop } from "./interop";
import Fragment_ from './Fragment.svelte';


export const Fragment = ({ children, key }: { children: any, key?: any }) =>
    new Interop(
        Fragment_,
        { children },
        (p, q) => ({ type: "Fragment", props: { children: q(p.children) } }), "_$Fagment$_", false
    )