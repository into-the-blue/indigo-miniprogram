import { observable, action } from 'mobx';
import { IStore, nextState, IMarker, IMetroStationClient, IApartment } from '@/types';

const USER_MARKER_URL = 'https://indigo.oss-cn-hangzhou.aliyuncs.com/images/marker.png';
const METRO_STATION_MARKER_URL =
  'https://indigo.oss-cn-hangzhou.aliyuncs.com/images/shanghai_metro.png';
const APARTMENT_MARKER_URL = 'https://indigo.oss-cn-hangzhou.aliyuncs.com/images/apartment.png';
class MapStore implements IStore<MapStore> {
  @observable currentCoordinate?: {
    lng: number;
    lat: number;
  };

  @observable markers: IMarker[] = [];

  currentMetroStations: IMetroStationClient[] = [];

  currentApartments: IApartment[] = [];

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
    this.markers = this.markers.filter(o => o.type !== 'station');
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

  @action
  setApartments = (apartments: IApartment[]) => {
    this.markers = this.markers.filter(o => o.type !== 'apartment');
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
}
export { MapStore };
