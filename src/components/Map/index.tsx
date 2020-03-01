import React from 'react';
import { Map } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { MapStore } from '@/store';

interface IProps {
  mMap?: MapStore;
  style?: React.CSSProperties;
}
const IMap = ({ mMap, style }: IProps) => {
  const { currentCoordinate, setting, setState } = mMap!;
  if (!currentCoordinate) return null;
  return (
    <Map
      style={style}
      longitude={currentCoordinate.lng}
      latitude={currentCoordinate.lat}
      setting={setting}
    />
  );
};

export default inject('mMap')(observer(IMap));
