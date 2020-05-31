import { observable, action } from 'mobx';
import {
  IStore,
  nextState,
  IMarker,
  IMetroStationClient,
  IApartment,
  ICustomLocationClient,
} from '@/types';
import { get } from 'lodash';
import Assets from '@/assets';
import { MAP_SETTING } from '@/utils/constants';
import { findItemByKeyValue } from '@/utils';

type FocusedMetroStation = {
  type: 'metroStation';
  stationId: string;
};

type FocusedCustomLocation = {
  type: 'customLocation';
  address: string;
  coordinates: [number, number];
};
type TFocusedLocation = FocusedMetroStation | FocusedCustomLocation;

class MapStore implements IStore<MapStore> {
  // user initial location
  initialCoordinate?: {
    lng: number;
    lat: number;
  };

  //custom locations
  @observable customLocations: ICustomLocationClient[] = [];
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
  setMetroStationMarkers = (stations: IMetroStationClient[]) => {
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
    if (!this.focusedLocation) return;
    if (this.focusedLocation.type === 'customLocation') return;
    if (
      !this.currentMetroStations.some(o => o.stationId === get(this.focusedLocation, 'stationId'))
    ) {
      this.cleanMarkersByType('apartment');
      this.focusedLocation = undefined;
    }
  };

  @action
  setCustomLocationMarker = (locationId: string) => {
    const customLocation = this.getCustomLocationById(locationId);
    if (!customLocation) return;
    this.cleanMarkersByType('customLocation');
    this.markers = this.markers.concat({
      id: 'customLocation ' + locationId,
      longitude: customLocation.coordinates[0],
      latitude: customLocation.coordinates[1],
      type: 'customLocation',
      width: 30,
      height: 30,
      iconPath: Assets.CustomLocation,
    });
  };

  @action
  setUserCurrentPositionMarker = (lng: number, lat: number) => {
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

  @action cleanMarkersByType = (type: 'user' | 'station' | 'apartment' | 'customLocation') => {
    this.markers = this.markers.filter(o => o.type !== type);
  };

  @action
  setApartmentMarkers = (apartments: IApartment[]) => {
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

  isLocationFocused: {
    (type: 'metroStation', stationId: string): boolean;
    (
      type: 'customLocation',
      coordinates: [number, number],
      payloads?: { address: string },
    ): boolean;
  } = (
    type: 'metroStation' | 'customLocation',
    data: string | [number, number],
    payload?: { address: string },
  ) => {
    if (type === 'metroStation') {
      return this.isStationFocused(data as string);
    }

    const focusedCoordinates = get(this.focusedLocation, 'coordinates');
    if (focusedCoordinates && focusedCoordinates.join(',') === (data as [number, number]).join(','))
      return true;
    this.focusedLocation = {
      type: 'customLocation',
      coordinates: data as any,
      ...payload!,
    };
    return false;
  };

  get focusedCustomLocation() {
    return this.focusedLocation as FocusedCustomLocation;
  }

  get focusedMetroStation() {
    return this.focusedLocation as FocusedMetroStation;
  }

  getCustomLocationById = (id: string) => findItemByKeyValue(this.customLocations, id, 'id');

  @action addCustomLocations = (cl: ICustomLocationClient) => {
    if (this.customLocations.some(o => o.id === cl.id)) return;
    this.customLocations.push(cl);
  };
}
export { MapStore };
