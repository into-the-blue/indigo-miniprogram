import React from 'react';
import { AtActionSheet, AtActionSheetItem } from 'taro-ui';
import { IAvailableCity } from '@/types';
import { observer } from 'mobx-react';
import { FlexView, Text } from '@/components';
import './styles.scss';
import classNames from 'classnames';

interface IProps {
  availableCities: IAvailableCity[];
  onSelectCity: (city: IAvailableCity) => void;
  dismissActionSheet: () => void;
  isOpen: boolean;
  currentCity: string | null;
  showActionSheet: () => void;
}

export const AvailableCities = observer(
  ({
    availableCities,
    onSelectCity,
    isOpen,
    dismissActionSheet,
    currentCity,
    showActionSheet,
  }: IProps) => {
    return (
      <FlexView className={classNames('available-cities__container')}>
        <FlexView
          onClick={showActionSheet}
          className={classNames('available-cities__text-container')}
        >
          <Text className={'available-cities__text'}>{currentCity || '未知'}</Text>
        </FlexView>

        <AtActionSheet
          isOpened={isOpen}
          onCancel={dismissActionSheet}
          onClose={dismissActionSheet}
          cancelText={'取消'}
          customStyle={{ zIndex: 10000 }}
        >
          {availableCities.map(city => {
            return (
              <AtActionSheetItem key={city.name} onClick={() => onSelectCity(city)}>
                {city.name}
                <Text style={{ fontSize: 13 }}>{` (新增${city.count}套房源)`}</Text>
              </AtActionSheetItem>
            );
          })}
        </AtActionSheet>
      </FlexView>
    );
  },
);
