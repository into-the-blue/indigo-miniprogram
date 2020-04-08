import React from 'react';
import { View, Text, CoverView, Image, CoverImage } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import {} from 'taro-ui';
import { MapStore } from '@/store';
import './styles.scss';
import Assets from '@/assets';

interface IProps {
  mMap?: MapStore;
  onPressSubscribe: () => void;
  onPressList: () => void;
}

const FocusedLocationConsole = ({ mMap, onPressList, onPressSubscribe }: IProps) => {
  const { focusedLocation } = mMap!;
  if (!focusedLocation) return null;
  console.warn('show');
  return (
    <CoverView className={'location-console__container'}>
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
    </CoverView>
  );
};

export default inject('mMap')(observer(FocusedLocationConsole));
