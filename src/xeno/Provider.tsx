import React from 'react';
import { Xeno } from './Xeno';

interface IProviderValue<T = any> {
  xeno: Xeno<T>;
}

export const XenoProviderContext = React.createContext<IProviderValue | undefined>(undefined);

interface IProviderProps extends IProviderValue {
  children: React.ReactNode;
}

export function Provider(props: IProviderProps) {
  const { children, ...rest } = props;
  const parentValue = React.useContext(XenoProviderContext);
  const mutableProviderRef = React.useRef({ ...parentValue, ...rest });
  const value = mutableProviderRef.current;
  return <XenoProviderContext.Provider value={value}>{children}</XenoProviderContext.Provider>;
}
Provider.displayName = 'XenoProvider';
