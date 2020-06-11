import React from 'react';
import { View, CoverView, CoverImage } from '@tarojs/components';
import {} from 'taro-ui';
import { MapStore } from '@/stores';
import './styles.scss';
import Assets from '@/assets';
import classNames from 'classnames';
import { FlexView } from '@/components';

interface IProps {
  mMap: MapStore;
  onPressSubscribe: () => void;
  onPressList: () => void;
  showApartmentList: boolean;
  // currentApartment?: IApartment;
  // apartments: IApartment[];
  // onPressApartment: (apartment: IApartment) => void;
}

const FocusedLocationConsole = ({
  mMap,
  onPressList,
  onPressSubscribe,
  showApartmentList,
}: // currentApartment,
// apartments,
// onPressApartment,
IProps) => {
  const { focusedLocation } = mMap;
  if (!focusedLocation) return null;
  return (
    <FlexView
      className={classNames('location-console__container', {
        'location-console__container-list-open': showApartmentList,
      })}
    >
      {/* <CoverView style={{ display: 'flex', flex: 1, height: '50vh' }}>
        <ScrollView scrollY style={{ display: 'flex', flex: 1, height: '50vh' }}>
          <ApartmentList
            visible={showApartmentList}
            apartments={apartments}
            textStyle={{ fontSize: 11 }}
            onPressApartment={onPressApartment}
          />
        </ScrollView>
      </CoverView> */}
      <View className={'location-console__icon-wrapper'}>
        <FlexView
          className={'location-console__icon-container'}
          onClick={e => {
            e.stopPropagation();
            onPressList();
          }}
        >
          <CoverImage className={'location-console__icon'} src={Assets.List} />
        </FlexView>
        <FlexView
          className={'location-console__icon-container'}
          onClick={e => {
            e.stopPropagation();
            onPressSubscribe();
          }}
        >
          <CoverImage className={'location-console__icon'} src={Assets.Subscribe} />
        </FlexView>
      </View>
    </FlexView>
  );
};

export default FocusedLocationConsole;
