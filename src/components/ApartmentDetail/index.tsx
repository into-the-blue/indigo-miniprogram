import React from 'react';
import { Swiper, SwiperItem } from '@tarojs/components';
import { ApartmentInfo } from './ApartmentInfo';
import { ComputedInfo } from './ComputedInfo';
import { IApartment } from '@/types';
import { FlexView } from '../FlexView';
import { Text } from '@/components';
import './styles.scss';
import classNames from 'classnames';

interface IProps {
  apartment: IApartment | null;
  additionalInfo?: { title: string; content: string }[];
  style?: React.CSSProperties;
  className?: string;
  inset?: boolean;
}

export const ApartmentDetail = ({ apartment, additionalInfo, style, className, inset }: IProps) => {
  if (!apartment)
    return (
      <FlexView
        style={{
          height: 310,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '25px',
          margin: '20px 15px',
        }}
        neumorphism
      >
        <Text>{'点击房源进行浏览详细信息'}</Text>
      </FlexView>
    );
  return (
    <Swiper
      indicatorDots
      className={classNames('apartment-detail__container', className)}
      style={{ ...style }}
    >
      <SwiperItem>
        <ApartmentInfo inset={inset} apartment={apartment as any} additionalInfo={additionalInfo} />
      </SwiperItem>
      <SwiperItem>
        <ComputedInfo inset={inset} computed={apartment.computed} />
      </SwiperItem>
    </Swiper>
  );
};
