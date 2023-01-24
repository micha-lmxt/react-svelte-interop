export const EventAction = (node: Node, props: { [key: string]: any }) => {
    let pr = props;
    let events = filterProps(pr);
    let eventList = toList(events,pr);
    applyEvents(node, eventList);
    return {
        update: (p: { [key: string]: any }) => {
            let ne = filterProps(p);

            const nl = toList(ne,p)
            eventList = eventList.filter(v=>{
                const w = nl.findIndex(x=>x.name === v.name)
                if (w>-1){
                    const ww = nl.splice(w,1)[0];
                    if (v.p !== ww.p){
                        //update
                        removeEvent(node,v)
                        v.p=ww.p;
                        v.fn =ww.fn;
                        applyEvents(node,[v]);
                    }
                    return true;
                }
                //delete unfound
                removeEvent(node,v)
                return false;
            }).concat(nl);
            
            //add new
            applyEvents(node, nl);
            
            
            
        },
        destroy: () => {
            eventList.forEach(v=>removeEvent(node, v));
        }
    }
}

export const filterProps = (props: { [key: string]: any }) => {
    return new Set(Object.keys(props)
        .filter(v => /^on[A-Z]/.test(v)))
}
const applyEvents = (node: Node, eventList:{name:string,fn:any}[]) => {
    eventList.forEach(v => {
        node.addEventListener(v.name.slice(2).toLowerCase(), v.fn)
    })
}
const removeEvent = (node: Node,ev:{name:string,fn:any}) => {
    node.removeEventListener(ev.name.slice(2).toLowerCase(), ev.fn)
    
}
const toList = (ev:Set<string>,p:{[key:string]:any})=>{
    return [...ev].map(v=>({name:v,p:p[v],fn:(e:any)=>{e.nativeEvent=e;p[v](e)}}))
}