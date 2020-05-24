import React, { useEffect, useRef, useContext } from 'react';
import { XenoProviderContext } from './Provider';

// copied from mobx react
export type IReactComponent<P = any> =
  | React.ClassicComponentClass<P>
  | React.ComponentClass<P>
  | React.FunctionComponent<P>
  | React.ForwardRefExoticComponent<P>;

function getInjectName(component: IReactComponent<any>, injectNames?: string): string {
  let displayName;
  const componentName =
    component.displayName ||
    component.name ||
    (component.constructor && component.constructor.name) ||
    'Component';
  if (injectNames) displayName = 'inject-with-' + injectNames + '(' + componentName + ')';
  else displayName = 'xeno-inject(' + componentName + ')';
  return displayName;
}

export interface XenoComponentProps<T = any> {
  on: <K extends keyof T = keyof T>(eventName: K, callback: (data: any) => void) => () => void;
  next: <K extends keyof T = keyof T>(eventName: K, payload: T[K]) => void;
}

export function injectXeno<T = any>(target: React.ComponentClass<any, any>) {
  function InjectedComp(props, ref) {
    const { xeno } = useContext(XenoProviderContext)!;
    const unsubscribeRef = useRef<(() => void)[]>([]);

    const unlistenAll = () => {
      for (let i = 0; i < unsubscribeRef.current.length; i++) {
        const unsubscribe = unsubscribeRef.current[i];
        if (typeof unsubscribe === 'function') unsubscribe();
      }
    };
    useEffect(() => {
      return unlistenAll;
    }, []);
    const on = <K extends keyof T = keyof T>(eventName: K, callback: (data: any) => void) => {
      const unlisten = xeno.on(eventName, callback);
      unsubscribeRef.current = unsubscribeRef.current.concat(unlisten);
      return unlisten;
    };

    const next = <K extends keyof T = keyof T>(eventName: K, payload: T[K]) => {
      xeno.next(eventName, payload);
    };
    const newProps = {
      ...props,
      on,
      next,
    };
    if (ref) newProps.ref = ref;
    return React.createElement(target, newProps);
  }

  const Injector = React.forwardRef(InjectedComp);
  Injector['wrappedComponent'] = target;
  Injector.displayName = getInjectName(target);

  return Injector;
}
