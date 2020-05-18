import React from 'react';
import { View, Text } from '@tarojs/components';
import { IApartment } from '@/types';
import { TextBar } from '../TextBar';
import { UNITS } from '@/utils/constants';
import { FlexView } from '../FlexView';
import { isApartment } from '@/utils';
import { AtTag } from 'taro-ui';
import './styles.scss';
import { Button } from '..';
import Taro from '@tarojs/taro';

interface IProps {
  apartment: IApartment;
}

export const ApartmentInfo = ({ apartment }: IProps) => {
  const copyUrl = () => {
    Taro.setClipboardData({
      data: apartment.houseUrl,
    });
  };
  return (
    <View>
      <FlexView justifyContent={'space-between'} paddingHorizontal={'10px'}>
        <Text>{apartment.title}</Text>

        {isApartment(apartment.tags) && <AtTag active> {'公寓'}</AtTag>}
      </FlexView>

      <TextBar title={'价格'} content={apartment.price + UNITS.CNY} />
      <TextBar title={'面积'} content={apartment.area + UNITS.squreMeter} />
      <TextBar
        title={'每平米价格'}
        content={apartment.pricePerSquareMeter + UNITS.pricePerSquareMeter}
      />
      <TextBar title={'户型'} content={apartment.houseType} />

      <FlexView>
        <Button onClick={copyUrl}>{'复制链接'}</Button>
      </FlexView>
    </View>
  );
};
