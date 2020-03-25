import { observable, action } from 'mobx';
import { IStore, nextState, IMarker, IMetroStationClient, IApartment } from '@/types';
import { get } from 'lodash';

const USER_MARKER_URL = 'https://indigo.oss-cn-hangzhou.aliyuncs.com/images/marker.png';
const METRO_STATION_MARKER_URL =
  'https://indigo.oss-cn-hangzhou.aliyuncs.com/images/shanghai_metro.png';
const APARTMENT_MARKER_URL = 'https://indigo.oss-cn-hangzhou.aliyuncs.com/images/apartment.png';

type FocusedMetroStation = {
  type: 'metroStation';
  stationId: string;
};

type FocusedCustomAddr = {
  type: 'address';
  address: string;
  coordinates: [number, number];
};
type TFocusedPosition = FocusedMetroStation | FocusedCustomAddr;

class MapStore implements IStore<MapStore> {
  initialCoordinate?: {
    lng: number;
    lat: number;
  };
  @observable currentCoordinate?: {
    lng: number;
    lat: number;
  };

  @observable mapDragged: boolean = false;

  @observable scale: number = 14;

  @observable markers: IMarker[] = [];

  currentMetroStations: IMetroStationClient[] = [];

  currentApartments: IApartment[] = [];

  focusedPosition?: TFocusedPosition;

  setting: any = {
    skew: 0,
    rotate: 0,
    showLocation: true,
    showScale: true,
    subKey: '',
    layerStyle: -1,
    enableZoom: true,
    enableScroll: true,
    enableRotate: false,
    showCompass: true,
    enable3D: false,
    enableOverlooking: false,
    enableSatellite: false,
    enableTraffic: false,
  };

  @action setState: <K extends keyof MapStore>(next: nextState<MapStore, K>) => void = next => {
    Object.assign(this, next);
  };

  @action
  setMetroStations = (stations: IMetroStationClient[]) => {
    if (!stations.length) return;
    this.cleanMarkersByType('station');
    const markers: IMarker[] = stations.map(s => ({
      id: 'station ' + s.stationId,
      longitude: s.coordinates[0],
      latitude: s.coordinates[1],
      iconPath: METRO_STATION_MARKER_URL,
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
      !this.currentMetroStations.some(o => o.stationId === get(this.focusedPosition, 'stationId'))
    ) {
      this.cleanMarkersByType('apartment');
      this.focusedPosition = undefined;
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
      iconPath: USER_MARKER_URL,
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
      iconPath: APARTMENT_MARKER_URL,
      type: 'apartment',
      width: 30,
      height: 30,
      title: apt.houseType + ' ' + apt.price,
    }));
    this.currentApartments = apartments;
    this.markers = this.markers.concat(markers);
  };

  isStationFocused = (stationId: string) => {
    if (get(this.focusedPosition, 'stationId') === stationId) return true;
    this.focusedPosition = {
      type: 'metroStation',
      stationId,
    };
    return false;
  };
}
export { MapStore };