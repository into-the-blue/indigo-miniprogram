import React from 'react';
import { Text, View } from '@tarojs/components';
import { IApartment } from '@/types';
import { FlexView } from '../FlexView';
import { UNITS } from '@/utils/constants';
import classNames from 'classnames';
import './styles.scss';

export const ApartmentCard = ({
  apartment,
  onPressApartment,
  isSelected,
  textStyle,
}: {
  apartment: IApartment;
  onPressApartment: () => void;
  isSelected: boolean;
  textStyle?: React.CSSProperties;
}) => {
  return (
    <View onClick={onPressApartment}>
      <FlexView
        className={classNames('apartment-card__container', {
          'apartment-card__container-selected': isSelected,
        })}
      >
        <Text
          className={classNames('apartment-card__text', {
            'apartment-card__text-selected': isSelected,
          })}
          style={{ flex: 0.3, ...textStyle }}
        >
          {apartment.houseType}
        </Text>
        <Text
          className={classNames('apartment-card__text', {
            'apartment-card__text-selected': isSelected,
          })}
          style={{ flex: 0.25, ...textStyle }}
        >
          {apartment.price + UNITS.CNY}
        </Text>
        <Text
          className={classNames('apartment-card__text', {
            'apartment-card__text-selected': isSelected,
          })}
          style={{ flex: 0.2, ...textStyle }}
        >
          {apartment.area + UNITS.squreMeter}
        </Text>
        <Text
          className={classNames('apartment-card__text', {
            'apartment-card__text-selected': isSelected,
          })}
          style={{ flex: 0.25, ...textStyle }}
        >
          {apartment.pricePerSquareMeter + UNITS.pricePerSquareMeter}
        </Text>
      </FlexView>
    </View>
  );
};
