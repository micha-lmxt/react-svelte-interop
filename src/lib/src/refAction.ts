export const refAction = (node:Node,symbol?:((ref:Node)=>void)|{current:any}) => {
    
    const inner = (s?:((ref:Node)=>void)|{current:any})=>{

        if (!s)return;
        if (typeof s === 'function'){
            s(node)
            return;
        }
        
        s.current = node;
        
    }
    inner(symbol);
    return {
        update:inner
    }   
}