import { filterProps } from "./eventAction.js";
import { StyleString } from "./styleString.js";

export const ClassAndStyle = (props: { [key: string]: any } & { className?: string ,children?:any,ref?:any}) => {
    const p = { class: props.className, ...props, style: StyleString(props.style)}
    delete p.className; 
    if ( "children" in p) delete p.children;
    if ("ref" in p ) delete p.ref;
    let events = filterProps(p);
    [...events].forEach(v=>(delete p[v]));
    Object.entries(p).forEach(([key,val])=>{
        if (typeof val === "symbol"){
            delete p[key];
        }
    })
    return p;
}
