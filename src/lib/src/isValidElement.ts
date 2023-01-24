export function isValidElement(x:any){

    return x && x.$sig === 'ReactJSX';
}