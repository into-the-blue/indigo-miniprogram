import React from 'react';
import { Text } from '@tarojs/components';
import { IApartment } from '@/types';
import { FlexView } from '../FlexView';
import { UNITS } from '@/utils/constants';
import classNames from 'classnames';
import './styles.scss';

export const ApartmentCard = ({
  apartment,
  onPressApartment,
  isSelected,
}: {
  apartment: IApartment;
  onPressApartment: () => void;
  isSelected: boolean;
}) => {
  return (
    <FlexView
      className={classNames('apartment-card__container', {
        'apartment-card__container-selected': isSelected,
      })}
      onClick={onPressApartment}
    >
      <Text
        className={classNames('apartment-card__text', {
          'apartment-card__text-selected': isSelected,
        })}
        style={{ flex: 0.3 }}
      >
        {apartment.houseType}
      </Text>
      <Text
        className={classNames('apartment-card__text', {
          'apartment-card__text-selected': isSelected,
        })}
        style={{ flex: 0.25 }}
      >
        {apartment.price + UNITS.CNY}
      </Text>
      <Text
        className={classNames('apartment-card__text', {
          'apartment-card__text-selected': isSelected,
        })}
        style={{ flex: 0.2 }}
      >
        {apartment.area + UNITS.squreMeter}
      </Text>
      <Text
        className={classNames('apartment-card__text', {
          'apartment-card__text-selected': isSelected,
        })}
        style={{ flex: 0.25 }}
      >
        {apartment.pricePerSquareMeter + UNITS.pricePerSquareMeter}
      </Text>
    </FlexView>
  );
};
