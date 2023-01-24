import Anything from "./Anything.svelte";
import { ClassComponent$ } from "./classHook.js";
import { createContext } from "./Context.js";
import { forwardRef } from "./forwardRef.js";
import { Fragment } from "./Fragment.js";
import { Interop } from "./interop.js";
import { isValidElement } from "./isValidElement.js";
import { Children } from "./Children.js";
import { cloneElement } from "./cloneElement.js";
import { memo } from "./memo.js";
import { createRef } from "./createRef.js";
import { createPortal } from "./dom/portal.js";
import { flushSync } from "./dom/flushSync.js";
import { startTransition } from "./startTransition.js";
import {
    useCallback, useDeferredValue, useId,
    useDebugValue, useEffect, useImperativeHandle,
    useLayoutEffect, useMemo, useReducer, useRef,
    useState, hook, hookGroup, useContext, 
    useSyncExternalStore
} from 'hooks-as-store';
import {useBeforeUpdate} from './useBeforeUpdate';
import { findDOMNode } from "./dom/findDOMNode";

export const REACT$ = {
    StrictMode: (props:any) => new Interop(Anything, { symbol: props.children }, (p, q) => ({type:"React.StrictMode",props:[...q(p.children)]}),"React.StrictMode",false),
    forwardRef,
    Component:ClassComponent$,
    PureComponent:ClassComponent$,
    createElement:(...args:any[])=>{console.log("Warning: REACT.createElement not replaced");console.log(args)},
    createContext,
    Fragment,
    isValidElement,
    Children,
    cloneElement,
    memo,
    createRef,
    startTransition,
    useCallback, useDeferredValue, useId,
    useDebugValue, useEffect, useImperativeHandle,
    useLayoutEffect, useMemo, useReducer, useRef,
    useState, hook, hookGroup, useContext, useBeforeUpdate,
    useInsertionEffect:useBeforeUpdate,
    useSyncExternalStore
}

export const DOM = {
    createRoot: (target: Element|ShadowRoot) => (
        {
            render: (i: Interop) => {
                return new (i.component)({ target, props: (i.$props||{}) })
            }
        }
    ),
    createPortal,
    flushSync,
    findDOMNode
}