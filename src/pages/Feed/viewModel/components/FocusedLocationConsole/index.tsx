import React from 'react';
import { View, Text, CoverView, Image, CoverImage } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import {} from 'taro-ui';
import { MapStore } from '@/store';
import './styles.scss';
import Assets from '@/assets';
import ApartmentList from '../ApartmentList';
import { IApartment } from '@/types';

interface IProps {
  mMap: MapStore;
  onPressSubscribe: () => void;
  onPressList: () => void;
  showApartmentList: boolean;
  currentApartment?: IApartment;
  apartments: IApartment[];
}

const FocusedLocationConsole = ({
  mMap,
  onPressList,
  onPressSubscribe,
  showApartmentList,
  currentApartment,
  apartments,
}: IProps) => {
  const { focusedLocation } = mMap;
  if (!focusedLocation) return null;
  console.warn('show');
  return (
    <CoverView className={'location-console__container'}>
      <ApartmentList
        show={showApartmentList}
        currentApartment={currentApartment}
        apartments={apartments}
      />
      <View className={'location-console__icon-wrapper'}>
        <View
          className={'location-console__icon-container'}
          onClick={e => {
            e.stopPropagation();
            onPressList();
          }}
        >
          <CoverImage className={'location-console__icon'} src={Assets.List} />
        </View>
        <View
          className={'location-console__icon-container'}
          onClick={e => {
            e.stopPropagation();
            onPressSubscribe();
          }}
        >
          <CoverImage className={'location-console__icon'} src={Assets.Subscribe} />
        </View>
      </View>
    </CoverView>
  );
};

export default FocusedLocationConsole;
