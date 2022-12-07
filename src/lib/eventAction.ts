export const EventAction = (node: Node, props: { [key: string]: any }) => {
    let pr = props;
    let events = filterProps(pr);
    applyEvents(node, events, pr);
    return {
        update: (p: { [key: string]: any }) => {
            let ne = filterProps(p);
            const { _new, _old } = Array.from(ne).reduce((p, v) => {
                if (p._old.has(v)) {
                    p._old.delete(v)
                } else {
                    p._new.add(v)
                }
                return p;
            }, { _new: new Set<string>([]), _old: events })
            applyEvents(node, _new, p);
            removeEvents(node, _old, pr);
            pr = p;
            events = ne;
        },
        destroy: () => {
            removeEvents(node, events, props)
        }
    }
}

const filterProps = (props: { [key: string]: any }) => {
    return new Set(Object.keys(props)
        .filter(v => /^on[A-Z]/.test(v)))
}
const applyEvents = (node: Node, event: Set<string>, props: { [key: string]: any }) => {
    Array.from(event).forEach(v => {
        node.addEventListener(v.slice(2).toLowerCase(), props[v])
    })
}
const removeEvents = (node: Node, event: Set<string>, props: { [key: string]: any }) => {
    Array.from(event).forEach(v => {
        node.removeEventListener(v.slice(2).toLowerCase(), props[v])
    })
}