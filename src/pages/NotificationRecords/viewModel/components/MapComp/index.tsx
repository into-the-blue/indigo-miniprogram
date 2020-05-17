import React from 'react';
import { View, Map } from '@tarojs/components';
import { MapProps } from '@tarojs/components/types/Map';
import { MAP_SETTING, SCREEN_WIDTH } from '@/utils/constants';
import { ISubscriptionNotificationRecordClient } from '@/types';
import Assets from '@/assets';

interface IProps {
  subscriptionCoordinates: [number, number];
  selectedRecords: ISubscriptionNotificationRecordClient[];
}

export const MapComp = ({ subscriptionCoordinates, selectedRecords }: IProps) => {
  const markers: MapProps.marker[] = selectedRecords.map(record => {
    return {
      id: ('apartment ' + record.apartmentId) as any,
      longitude: record.apartment.coordinates[0],
      latitude: record.apartment.coordinates[1],
      iconPath: Assets.ApartmentMarker,
      type: 'apartment',
      width: 30,
      height: 30,
      title: record.apartment.houseType + ' ' + record.apartment.price,
    };
  });

  const SUB_MARKER = {
    id: 'sub' as any,
    longitude: subscriptionCoordinates[0],
    latitude: subscriptionCoordinates[1],
    iconPath: Assets.PinDot,
    type: 'subscription',
    width: 40,
    height: 40,
  };
  markers.push(SUB_MARKER);
  return (
    <View style={{ width: '100vw', height: SCREEN_WIDTH * 0.8, position:'fixed',top:0,zIndex:1}}>
      <Map
        style={{ width: '100%', height: '100%' }}
        longitude={subscriptionCoordinates[0]}
        latitude={subscriptionCoordinates[1]}
        markers={markers}
        setting={MAP_SETTING}
      />
    </View>
  );
};
