import React from 'react';
import { Map, View } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { MapStore } from '@/stores';

interface IProps {
  mMap?: MapStore;
  style?: React.CSSProperties;
}
const IMap = ({ mMap, style }: IProps) => {
  const { currentCoordinate, setting } = mMap!;
  if (!currentCoordinate) return null;
  return (
    <View style={style}>
      <Map
        style={{ width: '100%', height: '100%' }}
        longitude={currentCoordinate[0]}
        latitude={currentCoordinate[1]}
        setting={setting}
      />
    </View>
  );
};

export default inject('mMap')(observer(IMap));
