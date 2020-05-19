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
  additionalInfo?: { title: string; content: string }[];
}

export const ApartmentInfo = ({ apartment, additionalInfo }: IProps) => {
  const copyUrl = () => {
    Taro.setClipboardData({
      data: apartment.houseUrl,
    });
    Taro.showToast({
      title: '请打开浏览器粘贴查看哦~',
      icon: 'success',
      duration: 3000,
    });
  };
  return (
    <View>
      <FlexView justifyContent={'space-between'} paddingHorizontal={'10px'} marginBottom={10}>
        <Text className={'apartment-info__title'}>{apartment.title}</Text>

        {isApartment(apartment.tags) && (
          <AtTag className={'apartment-info__tag'} active>
            {'公寓'}
          </AtTag>
        )}
      </FlexView>
      {apartment.distance && (
        <TextBar title={'距离'} content={apartment.distance.toFixed(0) + 'm'} />
      )}
      <TextBar title={'价格'} content={apartment.price + UNITS.CNY} />
      <TextBar title={'面积'} content={apartment.area + UNITS.squreMeter} />
      <TextBar
        title={'每平米价格'}
        content={apartment.pricePerSquareMeter + UNITS.pricePerSquareMeter}
      />
      <TextBar title={'户型'} content={apartment.houseType} />
      <TextBar title={'水电'} content={apartment.water + '/' + apartment.electricity} />
      {additionalInfo &&
        additionalInfo.map(item => (
          <TextBar title={item.title} content={item.content} key={item.title} />
        ))}

      <FlexView>
        <Button type={'primary'} onClick={copyUrl}>
          {'复制链接'}
        </Button>
      </FlexView>
    </View>
  );
};
