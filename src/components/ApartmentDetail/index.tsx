import React from 'react';
import { Swiper, SwiperItem } from '@tarojs/components';
import { ApartmentInfo } from './ApartmentInfo';
import { ComputedInfo } from './ComputedInfo';
import { IApartment } from '@/types';

interface IProps {
  apartment: IApartment;
  additionalInfo?: { title: string; content: string }[];
  style?: React.CSSProperties;
}

export const ApartmentDetail = ({ apartment, additionalInfo, style }: IProps) => {
  return (
    <Swiper indicatorDots style={{ height: 250, backgroundColor: 'white', ...style }}>
      <SwiperItem>
        <ApartmentInfo apartment={apartment as any} additionalInfo={additionalInfo} />
      </SwiperItem>
      <SwiperItem>
        <ComputedInfo computed={apartment.computed} />
      </SwiperItem>
    </Swiper>
  );
};
