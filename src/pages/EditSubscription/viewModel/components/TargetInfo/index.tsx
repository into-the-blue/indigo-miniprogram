import React from 'react';
import { View, Text, Map } from '@tarojs/components';
import { MAP_SETTING } from '@/utils/constants';
import Assets from '@/assets';
import { Button } from '@/components';
import './styles.scss';

interface IProps {
  type: 'metroStation' | 'customLocation';
  info: {
    address: string;
    coordinates: [number, number];
  };
  isUpdating: boolean;
  onPressSave: () => void;
}

const TargetInfo = ({ type, info, isUpdating, onPressSave }: IProps) => {
  return (
    <View className={'target-info__container'}>
      <View>
        <Text className={'target-info__title'}>{info.address}</Text>
        <Button onClick={onPressSave}>{isUpdating ? '更新' : '增加'}</Button>
      </View>

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
