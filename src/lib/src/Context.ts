
import ContextProvider from './ContextProvider.svelte';
import ContextConsumer from './ContextConsumer.svelte';
import { Interop } from './interop.js';
import { readable, type Readable } from 'svelte/store';
import { createUniqueId } from './createUniqueId';

export function createContext<T>(initial: T): {
    Provider: (props: any) => any,
    Consumer: (props: any) => any,
    displayName:string,
    default:Readable<T>
} {
    const context = {} as any
    const providerId = createUniqueId();
    context.Provider = (props: { value: T, chilldren?: any }) =>
        new Interop(
            ContextProvider,
            { ...props, context },
            (p, q) => ({ type: ContextProvider, props: { value: p.value, children: q(p.children) } }), providerId, false);
    context.Consumer = ({ children }: { children: (value: T) => any }) => new Interop(ContextConsumer, { context, children }, (p, q) => ({ type: ContextConsumer, props: { children: function children() { } } }), "c" + providerId, false);
    context.displayName = "Context";
    context.default = readable(initial);
    return context;
}