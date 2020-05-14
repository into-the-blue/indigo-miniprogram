import React from 'react';
import { View, Text, CoverView, Image, CoverImage } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import {} from 'taro-ui';
import { MapStore } from '@/stores';
import './styles.scss';
import Assets from '@/assets';
import ApartmentList from '../ApartmentList';
import { IApartment } from '@/types';
import classNames from 'classnames';

interface IProps {
  mMap: MapStore;
  onPressSubscribe: () => void;
  onPressList: () => void;
  showApartmentList: boolean;
  currentApartment?: IApartment;
  apartments: IApartment[];
  onPressApartment: (houseId: string) => void;
}

const FocusedLocationConsole = ({
  mMap,
  onPressList,
  onPressSubscribe,
  showApartmentList,
  currentApartment,
  apartments,
  onPressApartment,
}: IProps) => {
  const { focusedLocation } = mMap;
  if (!focusedLocation) return null;
  return (
    <CoverView
      className={classNames('location-console__container', {
        'location-console__container-list-open': showApartmentList,
      })}
    >
      <ApartmentList
        show={showApartmentList}
        currentApartment={currentApartment}
        apartments={apartments}
        onPressApartment={onPressApartment}
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
