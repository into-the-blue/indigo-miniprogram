import React from 'react';
import { Text } from '@tarojs/components';
import { IApartment } from '@/types';
import { FlexView } from '../FlexView';
import { UNITS } from '@/utils/constants';
import './styles.scss';

export const ApartmentCard = ({ apartment }: { apartment: IApartment }) => {
  return (
    <FlexView className={'apartment-card__container'}>
      <Text className={'apartment-card__text'} style={{ flex: 0.3 }}>
        {apartment.houseType}
      </Text>
      <Text className={'apartment-card__text'} style={{ flex: 0.25 }}>
        {apartment.price + UNITS.CNY}
      </Text>
      <Text className={'apartment-card__text'} style={{ flex: 0.2 }}>
        {apartment.area + UNITS.squreMeter}
      </Text>
      <Text className={'apartment-card__text'} style={{ flex: 0.25 }}>
        {apartment.pricePerSquareMeter + UNITS.pricePerSquareMeter}
      </Text>
    </FlexView>
  );
};
