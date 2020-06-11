import React from 'react';
import { Swiper, SwiperItem, Text } from '@tarojs/components';
import { ApartmentInfo } from './ApartmentInfo';
import { ComputedInfo } from './ComputedInfo';
import { IApartment } from '@/types';
import { FlexView } from '../FlexView';

interface IProps {
  apartment: IApartment | null;
  additionalInfo?: { title: string; content: string }[];
  style?: React.CSSProperties;
}

export const ApartmentDetail = ({ apartment, additionalInfo, style }: IProps) => {
  if (!apartment)
    return (
      <FlexView
        style={{
          height: 315,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>{'点击房源进行浏览详细信息'}</Text>
      </FlexView>
    );
  return (
    <Swiper
      indicatorDots
      style={{ height: 280, padding: '15px 0', backgroundColor: 'white', ...style }}
    >
      <SwiperItem>
        <ApartmentInfo apartment={apartment as any} additionalInfo={additionalInfo} />
      </SwiperItem>
      <SwiperItem>
        <ComputedInfo computed={apartment.computed} />
      </SwiperItem>
    </Swiper>
  );
};
