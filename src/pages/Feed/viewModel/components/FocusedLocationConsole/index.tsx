import React from 'react';
import { View, Text, CoverView, Image, CoverImage, ScrollView } from '@tarojs/components';
import {} from 'taro-ui';
import { MapStore } from '@/stores';
import './styles.scss';
import Assets from '@/assets';
import { ApartmentList } from '@/components/ApartmentList';
import { IApartment } from '@/types';
import classNames from 'classnames';
import { FlexView } from '@/components';

interface IProps {
  mMap: MapStore;
  onPressSubscribe: () => void;
  onPressList: () => void;
  showApartmentList: boolean;
  // currentApartment?: IApartment;
  apartments: IApartment[];
  onPressApartment: (apartment: IApartment) => void;
}

const FocusedLocationConsole = ({
  mMap,
  onPressList,
  onPressSubscribe,
  showApartmentList,
  // currentApartment,
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
      {/* <FlexView> */}
        <ScrollView scrollY style={{ display: 'flex', flex: 1, height: '50vh' }}>
          <ApartmentList
            visible={showApartmentList}
            // currentApartment={currentApartment}
            apartments={apartments}
            textStyle={{ fontSize: 11 }}
            onPressApartment={onPressApartment}
          />
        </ScrollView>
      {/* </FlexView> */}
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
