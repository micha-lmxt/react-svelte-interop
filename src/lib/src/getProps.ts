export function getProps(symbol: any): (any | undefined) {
    if (symbol && symbol.$sig === "ReactJSX") {
        return {props:symbol.props,type:symbol.type}
    } else if (symbol && Array.isArray(symbol)) {
        return symbol.map(v => getProps(v))
    } else if (symbol !== null && symbol !== undefined && typeof symbol !== "boolean") {
        return symbol
    }
}
