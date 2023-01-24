export const memo = <Props>(
    component: (p: Props) => any,
    arePropsEqual?: (previousProps: Props, newProps: Props) => boolean
) => {
    (component as any).__memo__=true;
    return component;
}