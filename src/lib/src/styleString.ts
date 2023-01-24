/**
 * IS_NON_DIMENSIONAL - Copied from https://github.com/preactjs/preact/blob/master/src/constants.js
 * The MIT License (MIT)

Copyright (c) 2015-present Jason Miller

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. 
 */
export const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

export const StyleString = (k: { [key: string]: string }) => {
    if (!k) {
        return undefined;
    }
    return Object.entries(k).map(v => {
        const [key, val] = v;
        return key.replace(/([A-Z])/g, "-$1").toLowerCase() + ": " +
            ((typeof val != 'number' || IS_NON_DIMENSIONAL.test(key)) ? val : (val + "px"))
    }).join(";");
}
export const UpcasePropToDash = (k:{[key:string]:any}) => {
    if (!k) {
        return {};
    }
    return Object.entries(k).reduce((p,v) => {
        const [key, val] = v;
        p[key.replace(/([A-Z])/g, "-$1").toLowerCase()] = val;
        return p;
    },{} as any);
}