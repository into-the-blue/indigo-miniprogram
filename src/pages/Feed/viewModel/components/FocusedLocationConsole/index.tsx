import React from 'react';
import { View, CoverImage } from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui';
import { MapStore } from '@/stores';
import './styles.scss';
import Assets from '@/assets';
import classNames from 'classnames';
import { FlexView, Text } from '@/components';

interface IProps {
  mMap: MapStore;
  onPressSubscribe: () => void;
  onPressList: () => void;
  // showApartmentList: boolean;
  showAptsNearby: () => void;
  queryAndShowAptsNearby: () => void;
  numOfApartmentsNearby?: number;
  isQueryingAptsNearby: boolean;
}

const FocusedLocationConsole = ({
  mMap,
  onPressList,
  onPressSubscribe,
  // showApartmentList,
  numOfApartmentsNearby,
  showAptsNearby,
  queryAndShowAptsNearby,
  isQueryingAptsNearby,
}: IProps) => {
  const { focusedLocation } = mMap;
  const hasAptsNearby = !!numOfApartmentsNearby;
  return (
    <FlexView
      className={classNames('location-console__container', {
        // 'location-console__container-list-open': showApartmentList,
      })}
    >
      <View className={'location-console__icon-wrapper'}>
        {!focusedLocation && (
          <FlexView
            className={classNames(
              'location-console__icon-container',
              'location-console__icon-primary',
              {
                'location-console__icon-animation': hasAptsNearby,
              },
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (isQueryingAptsNearby) return;
              hasAptsNearby && showAptsNearby();
              !hasAptsNearby && queryAndShowAptsNearby();
            }}
          >
            {isQueryingAptsNearby ? (
              <AtActivityIndicator color={'white'} />
            ) : (
              <Text>{hasAptsNearby ? numOfApartmentsNearby : '猹'}</Text>
            )}
          </FlexView>
        )}
        {focusedLocation && (
          <FlexView
            className={'location-console__icon-container'}
            onClick={(e) => {
              e.stopPropagation();
              onPressList();
            }}
          >
            <CoverImage className={'location-console__icon'} src={Assets.List} />
          </FlexView>
        )}
        {focusedLocation && (
          <FlexView
            className={'location-console__icon-container'}
            onClick={(e) => {
              e.stopPropagation();
              onPressSubscribe();
            }}
          >
            <CoverImage className={'location-console__icon'} src={Assets.Subscribe} />
          </FlexView>
        )}
      </View>
    </FlexView>
  );
};

export default FocusedLocationConsole;
