import React, { useEffect, useState } from 'react';
import { View, Map } from '@tarojs/components';
import { MapProps } from '@tarojs/components/types/Map';
import { MAP_SETTING } from '@/utils/constants';
import { ISubscriptionNotificationRecordClient } from '@/types';
import Assets from '@/assets';
import { observer } from 'mobx-react';
import { MAP_HEIGHT } from '@/pages/NotificationRecords/constants';
import { addCoordinatesBias } from '@/stores/mapStore/helper';
import { FlexView } from '@/components';

interface IProps {
  subscriptionCoordinates: [number, number];
  centralCoordinates: [number, number];
  selectedRecords: ISubscriptionNotificationRecordClient[];
}

export const MapComp = observer(
  ({ subscriptionCoordinates, centralCoordinates, selectedRecords }: IProps) => {
    const [markers, setMarkers] = useState<MapProps.marker[]>([]);

    useEffect(() => {
      const newMarkers = selectedRecords.map(record => {
        const found = markers.find(m => m.id === (('apartment ' + record.apartmentId) as any));
        if (found) return found;
        return {
          id: ('apartment ' + record.apartmentId) as any,
          longitude: addCoordinatesBias(record.apartment.coordinates[0]),
          latitude: addCoordinatesBias(record.apartment.coordinates[1]),
          iconPath: Assets.ApartmentMarker,
          type: 'apartment',
          width: 30,
          height: 30,
          title: record.apartment.houseType + ' ' + record.apartment.price,
        };
      });
      setMarkers(newMarkers);
    }, [selectedRecords]);

    const SUB_MARKER: MapProps.marker = {
      id: 'sub' as any,
      longitude: subscriptionCoordinates[0],
      latitude: subscriptionCoordinates[1],
      iconPath: Assets.PinDot,
      type: 'subscription',
      width: 40,
      height: 40,
    } as any;
    return (
      <FlexView
        column
        style={{ width: '100vw', height: MAP_HEIGHT, position: 'fixed', top: 0, zIndex: 1 }}
      >
        <Map
          style={{ width: '100%', height: '100%' }}
          longitude={centralCoordinates[0]}
          latitude={centralCoordinates[1]}
          markers={[SUB_MARKER].concat(markers)}
          setting={MAP_SETTING}
          scale={13}
        />
      </FlexView>
    );
  },
);
