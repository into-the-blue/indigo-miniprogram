import React from 'react';
import { View, Map } from '@tarojs/components';
import { MAP_SETTING } from '@/utils/constants';
import Assets from '@/assets';
import { Button, Text } from '@/components';
import './styles.scss';
import classNames from 'classnames';

interface IProps {
  type: 'metroStation' | 'customLocation' | null;
  info: {
    address: string;
    coordinates: [number, number];
  } | null;
  isUpdating: boolean;
  onPressSave: () => void;
}

const TargetInfo = ({ type, info, isUpdating, onPressSave }: IProps) => {
  if (!info) return null;
  return (
    <View className={'target-info__container'}>
      <View>
        <Text
          className={classNames('target-info__title', {
            'target-info__title-long': info.address.length > 16,
          })}
        >
          {info.address}
        </Text>
        <Button onClick={onPressSave} type={'primary'}>
          {isUpdating ? '更新' : '增加'}
        </Button>
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
