export type Ref<T> = ((ref:T)=>void)|{current:T}
export function forwardRef<T>(f:(props:{[key:string]:any},ref:Ref<T>)=>any){
    return (p:{[key:string]:any}={})=>f({...p,ref:undefined},p.ref)
}