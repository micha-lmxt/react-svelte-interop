const map = (ch: any, cb: (c: any, i: number) => any, context?: any) => {

    if (ch == null) {
        return ch;
    }
    const type = typeof ch;
    if (type === "undefined" || type === "boolean") {
        return [];
    }

    return toChildArray(ch)?.map((v, i) => cb.call(context, v, i))
    
    
}
const toChildArray =(children:any)=>{
    if(Array.isArray(children)){
        return children.flat(4)
    }
    return children?[children]:null;
}
export const Children = {
    map,
    forEach: map,
    count(children: any) {
        return children ? Array.isArray(children) ? children.length : 1 : 0
    },
    only(children:any) {
		const normalized = toChildArray(children);
		if (normalized?.length !== 1) throw 'Children.only';
		return normalized[0];
	},
	toArray: toChildArray
}
