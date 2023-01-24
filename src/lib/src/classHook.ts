import {  useEffect, useLayoutEffect, useRef, useState, useContext } from 'hooks-as-store'
import {useBeforeUpdate} from './useBeforeUpdate';

class ClassComponent$<Props, State>{
    static contextType: any = undefined
    static defaultProps: any
    ref: any
    context: any = undefined
    displayName: string = "ReactClassComponent$"

    props: Props
    state: State = {} as unknown as State
    constructor(props: Props) {
        this.props = props;
    }

    static getDerivedStateFromProps(props: any, state: any): any {
        return null;
    }
    render(): any { return null }
    componentDidMount() { }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean { return true }

    getSnapshotBeforeUpdate(prevProps: Props, prevState: State): any { return null }

    componentDidUpdate(prevProps: Props, prevState: State, snapshot: any) { }

    componentWillUnmount() { }

    static getDerivedStateFromError: undefined | ((error: any) => any) = undefined

    componentDidCatch: undefined | ((error: any, info: any) => void) = undefined

    setState(updater: ((state: State, props: Props) => State) | Partial<State>): void { }
    forceUpdate() { }

    __$snapshot: any = null
    __$prevForce = -1
    __$mounted = false
    isReactComponent(){
        return true;
    }
}

export const isClassComponent = (fun:any)=>typeof fun==="function"&&fun.prototype && fun.prototype.isReactComponent;
export let classHook = <Props extends { ref?: any }, State>(reactClassComponent$: typeof ClassComponent$<Props, State>) =>
    (props: Props) => {
        const ref = props.ref;
        const [forcer, Force] = useState(1);
        const [classComponent] = useState(new reactClassComponent$({ ...reactClassComponent$.defaultProps, ...props,ref:undefined }));
        const context = useContext(reactClassComponent$.contextType);
        classComponent.context = context as any;
        const [state, setState] = useState(classComponent.state);

        useEffect(() => {
            classComponent.__$mounted = true;
            classComponent.componentDidMount();
            classComponent.setState = (updater) => {
                if (typeof updater === "function") {
                    setState(((_state: State) => updater(_state, classComponent.props)) as any)
                } else {
                    setState(((_state: State) => ({ ..._state, ...updater })) as any)
                }
            }
            classComponent.forceUpdate = () => Force(-classComponent.__$prevForce);
            return ()=>{
                classComponent.componentWillUnmount()
            }
        }, [classComponent])

        useBeforeUpdate(() => {
            if (!classComponent.__$mounted) return undefined;
            classComponent.__$snapshot = classComponent.getSnapshotBeforeUpdate(classComponent.props, classComponent.state)
            return undefined
        })

        const prevRes = useRef<any>(null)
        const derived = reactClassComponent$.getDerivedStateFromProps(props, state);
        const derivedState = derived !== null ? derived : state;
        const shouldUpdate = forcer !== classComponent.__$prevForce || classComponent.shouldComponentUpdate(props, derivedState);
        classComponent.__$prevForce = forcer;
        const prevState = classComponent.state;
        const prevProps = classComponent.props;

        useLayoutEffect(() => {
            if (shouldUpdate && classComponent.__$mounted) {
                classComponent.componentDidUpdate(prevProps, prevState, classComponent.__$snapshot)
            }
            return undefined
        })

        if (!shouldUpdate) {
            return prevRes.current;
        }

        classComponent.state = derivedState;
        classComponent.props = props;
        try {
            prevRes.current = classComponent.render();
        } catch (e) {
            if (classComponent.componentDidCatch||ClassComponent$.getDerivedStateFromError){
                if (ClassComponent$.getDerivedStateFromError){
                    classComponent.state = ClassComponent$.getDerivedStateFromError(e)
                }
                classComponent.componentDidCatch?.(e,"TODO");
            }else{
                throw(e);
            }
        }
        if (props.ref && props.ref !== classComponent.ref) {
            if (typeof (props.ref) === 'function') {
                props.ref(classComponent)
            } else {
                props.ref.current = classComponent;
            }
            classComponent.ref = props.ref
        }
        return prevRes.current;
    }

export { ClassComponent$ };