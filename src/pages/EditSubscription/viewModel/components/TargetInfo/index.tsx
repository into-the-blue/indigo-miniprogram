import React from 'react';
import { View, Text, Map } from '@tarojs/components';
import { MAP_SETTING } from '@/utils/constants';
import Assets from '@/assets';
import './styles.scss';

interface IProps {
  type: 'metroStation' | 'customLocation';
  info: {
    address: string;
    coordinates: [number, number];
  };
}

const TargetInfo = ({ type, info }: IProps) => {
  return (
    <View className={'target-info__container'}>
      <Text className={'target-info__title'}>{info.address}</Text>

      <Map
        className={'target-info__map'}
        latitude={info.coordinates[1]}
        longitude={info.coordinates[0]}
        setting={MAP_SETTING}
        markers={[
          {
            longitude: info.coordinates[0],
            latitude: info.coordinates[1],
            iconPath: Assets.UserLocationMarker,
            width: 40,
            height: 40,
          },
        ]}
      />
    </View>
  );
};

export default TargetInfo;
