import React from 'react';
import { AtActionSheet, AtActionSheetItem } from 'taro-ui';
import { IAvailableCity } from '@/types';
import { observer } from 'mobx-react';

interface IProps {
  availableCities: IAvailableCity[];
  onSelectCity: (city: IAvailableCity) => void;
  dismissActionSheet: () => void;
  isOpen: boolean;
}

export const AvailableCities = observer(
  ({ availableCities, onSelectCity, isOpen, dismissActionSheet }: IProps) => {
    return (
      <AtActionSheet
        isOpened={isOpen}
        onCancel={dismissActionSheet}
        onClose={dismissActionSheet}
        cancelText={'取消'}
      >
        {availableCities.map(city => {
          return (
            <AtActionSheetItem key={city.name} onClick={() => onSelectCity(city)}>
              {city.name}
            </AtActionSheetItem>
          );
        })}
        {/* <AtActionSheetItem onClick={dismissActionSheet}>
        <Text style={{ color: 'red' }}>{'取消'}</Text>
      </AtActionSheetItem> */}
      </AtActionSheet>
    );
  },
);
