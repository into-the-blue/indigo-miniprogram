import { getStores } from '.';
import { findItemByKeyValue } from '@/utils';
import { IMetroStationClient } from '@/types';

export function setMetroStationAsSubTarget(
  stationId: string | Pick<IMetroStationClient, 'stationId' | 'stationName' | 'coordinates'>,
) {
  const { editSubscriptionStore, mMap } = getStores('editSubscriptionStore', 'mMap');

  let station: any;
  if (typeof stationId === 'string') {
    station = findItemByKeyValue(
      mMap.currentMetroStations,
      'stationId',
      mMap.focusedMetroStation.stationId,
    );
  } else {
    station = stationId;
  }
  const next: any = {
    target: {
      type: 'metroStation',
      payload: station!,
    },
  };
  editSubscriptionStore.setState(next);
}
