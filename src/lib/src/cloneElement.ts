import ReactComponent from "./ReactComponent.svelte"
import { Interop } from "./interop.js";

export const cloneElement = (element: Interop, props: { [key: string]: any }, ...children: any[]) => {
    if (element.$sig!=="ReactJSX"){
        warn("cloneElement expects a valid element")
    }
    console.log("clone: ",element,props,children)
    if (element.component == ReactComponent){
        console.log("same Comp")
        const combinedProps = {...element.$props.props,...props}
        return new Interop(element.component,{...element.$props,props:combinedProps},element.$propfun,element.$uniqueId)
    }
    return new Interop(element.component,{...element.$props,...props},
        element.$propfun,element.$uniqueId)

}