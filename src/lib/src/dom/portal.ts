import Portal from "./Portal.svelte";
import { toReact } from "../toReact";

export const createPortal = (children:any, domNode:any)=>{
    return toReact(Portal,{target:domNode,children})
}