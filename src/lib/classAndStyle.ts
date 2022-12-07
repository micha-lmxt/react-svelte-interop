import { StyleString } from "./styleString.js";

export const ClassAndStyle = (props: { [key: string]: any } & { className?: string }) => {
    const p = { class: props.className, ...props, style: StyleString(props.style) }
    delete p.className;
    return p;
}
