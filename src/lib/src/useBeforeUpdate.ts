import { useBeforeUpdate as _useBeforeUpdate, useContext ,useEffect,useRef} from "hooks-as-store";
import { setContext } from "svelte";
import { readable } from "svelte/store";

const BeforeUpdateContext = "BEFOREuPDATECONTEXT"

class BeforeUpdateCoordinator{
    list:(()=>void)[]
    parent?:BeforeUpdateCoordinator
    constructor(parent?:BeforeUpdateCoordinator){
        this.list = [];
        this.parent = parent;        
        setContext(BeforeUpdateContext,readable(this));
        if (parent){
            parent.add(this.run);
        }
    }
    add(handler:()=>void){
        this.list.push(handler)        
    }
    remove(handler:()=>void){
        this.list.filter(v=>v!==handler);
    }
    run = ()=>{
        this.list.forEach(v=>v());
    }
    end(){
        this.parent?.remove(this.run);
    }
}

export const useBeforeUpdateCoordinator = ()=>{
    const parent = useContext<BeforeUpdateCoordinator>(BeforeUpdateContext);
    const buc = useRef(new BeforeUpdateCoordinator(parent));
    _useBeforeUpdate(()=>buc.current.run(),[buc])
    useEffect(()=>()=>buc.current.end(),[buc])
}

export const useBeforeUpdate = (handler: () => undefined | (() => void), reqs?: any[])=>{
    const buc = useContext<BeforeUpdateCoordinator>(BeforeUpdateContext);
    
    const isDone = useRef(false);
    _useBeforeUpdate(()=>{
        //if (!isDone.current)
            handler()
        isDone.current=false;
    },reqs)
    useEffect(()=>{
        buc.add(()=>{
            if (isDone.current)return;
            isDone.current = true;
            handler()
        });
        return ()=>{buc.remove(handler)}
    },reqs)
    
}