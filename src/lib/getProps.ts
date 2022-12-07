export function getProps(symbol: any): (any[] | undefined) {

    if (symbol && symbol.$sig === "ReactJSX") {
        return [symbol.props]
    } else if (symbol && Array.isArray(symbol)) {
        return symbol.map(v => getProps(v))
    } else if (symbol) {
        return [symbol]
    }
}