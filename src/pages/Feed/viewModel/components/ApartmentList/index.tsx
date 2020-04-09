import React from 'react';
import { CoverView, View, Text, ScrollView } from '@tarojs/components';
import { IApartment } from '@/types';
import classNames from 'classnames';
import { get } from 'lodash';
import './styles.scss';

interface IProps {
  show: boolean;
  apartments: IApartment[];
  currentApartment?: IApartment;
}
const Card = ({ apartment, focused }: { apartment: IApartment; focused: boolean }) => {
  return (
    <View
      className={classNames('apt-list__card-container', {
        'apt-list__card-container-focused': focused,
      })}
    >
      <Text className={'apt-list__card-text'}>{apartment.houseType}</Text>
      <Text className={'apt-list__card-text'}>{apartment.price + '¥'}</Text>
      <Text className={'apt-list__card-text'}>{apartment.area + '㎡'}</Text>
      <Text className={'apt-list__card-text'}>{apartment.pricePerSquareMeter + '¥/㎡'}</Text>
    </View>
  );
};

const ApartmentList = ({ show, apartments, currentApartment }: IProps) => {
  if (!show) return null;
  return (
    <ScrollView scrollY className={'apt-list__container'}>
      {apartments.map((apt, idx) => (
        <Card
          key={apt.houseId + idx}
          apartment={apt}
          focused={get(currentApartment, 'houseId') === apt.houseId}
        />
      ))}
    </ScrollView>
  );
};

export default ApartmentList;
