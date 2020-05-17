import { observable, action } from 'mobx';
import { IStore, nextState, IMarker, IMetroStationClient, IApartment } from '@/types';
import { get } from 'lodash';
import Assets from '@/assets';
import { MAP_SETTING } from '@/utils/constants';

type FocusedMetroStation = {
  type: 'metroStation';
  stationId: string;
};

type FocusedCustomAddr = {
  type: 'address';
  address: string;
  coordinates: [number, number];
};
type TFocusedLocation = FocusedMetroStation | FocusedCustomAddr;

class MapStore implements IStore<MapStore> {
  // user initial location
  initialCoordinate?: {
    lng: number;
    lat: number;
  };
  // center of the map
  @observable currentCoordinate?: {
    lng: number;
    lat: number;
  };
  // if map has been dragged
  @observable mapDragged: boolean = false;
  // map scale
  @observable scale: number = 14;
  // markers on the map
  @observable markers: IMarker[] = [];
  // metro stations in region
  currentMetroStations: IMetroStationClient[] = [];
  // apartments in region
  currentApartments: IApartment[] = [];
  // current location been tapped, can be metro station or search result
  @observable focusedLocation?: TFocusedLocation;
  // map default setting
  setting: any = MAP_SETTING;
  // city
  @observable currentCity: string = 'shanghai';

  @action setState: <K extends keyof MapStore>(next: nextState<MapStore, K>) => void = next => {
    Object.assign(this, next);
  };

  /**
   *
   *
   * @memberof MapStore
   * set current metro stations in region
   * clean station markers
   * set new markers
   */
  @action
  setMetroStations = (stations: IMetroStationClient[]) => {
    if (!stations.length) return;
    this.cleanMarkersByType('station');
    const markers: IMarker[] = stations.map(s => ({
      id: 'station ' + s.stationId,
      longitude: s.coordinates[0],
      latitude: s.coordinates[1],
      iconPath: Assets.MetroSH,
      type: 'station',
      width: 40,
      height: 40,
    }));
    this.currentMetroStations = stations;
    this.markers = this.markers.concat(markers);
    this.cleanFocusedStation();
  };

  /**
   * if focused station not exists in currentMetroStations, clean apartment markers
   *
   * @memberof MapStore
   */
  @action
  cleanFocusedStation = () => {
    if (
      !this.currentMetroStations.some(o => o.stationId === get(this.focusedLocation, 'stationId'))
    ) {
      this.cleanMarkersByType('apartment');
      this.focusedLocation = undefined;
    }
  };

  @action
  setUserCurrentPosition = (lng: number, lat: number) => {
    const found = this.markers.findIndex(o => o.type === 'user');
    this.currentCoordinate = {
      lng,
      lat,
    };
    const marker: IMarker = {
      id: 'user -1',
      longitude: lng,
      latitude: lat,
      iconPath: Assets.UserLocationMarker,
      type: 'user',
      width: 30,
      height: 30,
    };
    if (found === -1) {
      this.markers.push(marker);
    } else {
      this.markers[found] = marker;
    }
  };

  @action cleanMarkersByType = (type: 'user' | 'station' | 'apartment') => {
    this.markers = this.markers.filter(o => o.type !== type);
  };

  @action
  setApartments = (apartments: IApartment[]) => {
    this.cleanMarkersByType('apartment');
    const markers: IMarker[] = apartments.map(apt => ({
      id: 'apartment ' + apt.houseId,
      longitude: apt.coordinates[0],
      latitude: apt.coordinates[1],
      iconPath: Assets.ApartmentMarker,
      type: 'apartment',
      width: 30,
      height: 30,
      title: apt.houseType + ' ' + apt.price,
    }));
    this.currentApartments = apartments;
    this.markers = this.markers.concat(markers);
  };

  isStationFocused = (stationId: string) => {
    if (get(this.focusedLocation, 'stationId') === stationId) return true;
    this.focusedLocation = {
      type: 'metroStation',
      stationId,
    };
    return false;
  };

  get focusedMetroStation() {
    return this.focusedLocation as FocusedMetroStation;
  }
}
export { MapStore };
