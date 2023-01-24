<script context="module">
    
    const array =(s,keycheck = {___counter:0},arr=[])=>{
        const l = s.length;
        for (let i=0;i < l;i++){
            const v = s[i]
            //remove unneccesary
            if (v===null||v===undefined || typeof v === "boolean")continue;

            if (v.key){
                
                if (v.key in keycheck){
                    console.log("Key " + v.key + " used more than once in Array");
                    arr.push({el:v,key:v.key+"_" + (keycheck[v.key]++)})
                    continue;
                }
                keycheck[v.key] = 0;
                arr.push({el:v,key:v.key})
                continue;
            }

            //flatten
            if (Array.isArray(v)){
                if (!("__array__" in keycheck)){
                    keycheck.__array__ = 0;
                }
                keycheck.__array__++;
                arr.push({el:v,key:"__array__" + keycheck.__array__});
                
                continue;
            }
            
            //interop
            if (v.$uniqueId){
            
                if (!(v.$uniqueId in keycheck)){
                    keycheck[v.$uniqueId] = 0;
                }
                keycheck[v.$uniqueId] = keycheck[v.$uniqueId]+1;
                arr.push({el:v,key:v.$uniqueId + "~" +keycheck[v.$uniqueId]});
                
                continue;
            }
        
            //rest
            arr.push({el:v,key:(keycheck.___counter++) + "$-$" + (v.description || (typeof v === "symbol" ? "Symbol()" : v.toString()))})
        }
        return arr;
    }
</script>
<script>
import {SvelteSlotInReact} from './symbol.js';
export let symbol;

</script>

{#if symbol && symbol.$sig==="ReactJSX"}
<svelte:component this={symbol.component} {...(symbol.$props||{})} ><slot/></svelte:component>
{:else if symbol && Array.isArray(symbol)}
{#each array(symbol) as s,i (s.key)}
    <svelte:self symbol={s.el}><slot/></svelte:self>
{/each}
<!-- vite dev server bundles dependencies, so the symbol can't be checked by reference -->
{:else if symbol && symbol.description === SvelteSlotInReact.description }
<slot/>
{:else if symbol !== null && symbol !== undefined && typeof symbol !== "boolean"}
{symbol}
{/if}