import { observable, action } from 'mobx';
import {
  IStore,
  nextState,
  IMarker,
  IMetroStationClient,
  IApartment,
  ICustomLocationClient,
  IAvailableCity,
} from '@/types';
import { get } from 'lodash';
import Assets from '@/assets';
import { MAP_SETTING } from '@/utils/constants';
import { findItemByKeyValue } from '@/utils';
import { removeShi } from './helper';

type FocusedMetroStation = {
  type: 'metroStation';
  payload: Pick<IMetroStationClient, 'stationId'>;
};

type FocusedCustomLocation = {
  type: 'customLocation';
  payload: ICustomLocationClient;
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
  @observable currentCoordinate?: [number, number];
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

  @observable availableCities: IAvailableCity[] = [];

  @observable cityActionSheetVisible: boolean = false;

  @observable isSearchBarOpen: boolean = false;

  @action openSearchBar = () => {
    this.isSearchBarOpen = true;
  };
  @action closeSearchBar = () => {
    this.isSearchBarOpen = false;
  };

  @action setState: <K extends keyof MapStore>(next: nextState<MapStore, K>) => void = next => {
    Object.assign(this, next);
  };

  @action setCurrentCoordinates = (lng: number, lat: number) => {
    this.currentCoordinate = [lng, lat];
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
      !this.currentMetroStations.some(
        o => o.stationId === get(this.focusedMetroStation, 'payload.stationId'),
      )
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

  /**
   *
   *
   * @memberof MapStore
   * set current coordinates and add marker
   */
  @action
  setUserCurrentPositionMarker = (lng: number, lat: number) => {
    const found = this.markers.findIndex(o => o.type === 'user');
    this.currentCoordinate = [lng, lat];
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
    if (get(this.focusedMetroStation, 'payload.stationId') === stationId) return true;
    this.focusedLocation = {
      type: 'metroStation',
      payload: { stationId },
    };
    return false;
  };

  isLocationFocused: {
    (type: 'metroStation', stationId: string): boolean;
    (type: 'customLocation', customLocationId: string, payloads?: ICustomLocationClient): boolean;
  } = (type: 'metroStation' | 'customLocation', id: string, payload?: ICustomLocationClient) => {
    if (type === 'metroStation') {
      return this.isStationFocused(id);
    }

    const focusedId = get(this.focusedCustomLocation, 'payload.id');
    if (focusedId && focusedId === id) return true;
    this.focusedLocation = {
      type: 'customLocation',
      payload: {
        ...payload!,
      },
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

  @action setAvailableCities = (cities: IAvailableCity[]) => {
    this.availableCities = cities;
  };

  @action setCurrentCity = (city: string) => {
    this.currentCity = city;
  };

  @action showCityActionSheet = () => {
    this.cityActionSheetVisible = true;
  };

  @action dismissCityActionSheet = () => {
    this.cityActionSheetVisible = false;
  };

  inAvailableCities = (city: string) => {
    const normailized = city.toLowerCase();
    const key = /^[a-z]+$/.test(normailized) ? 'value' : 'name';
    return this.availableCities.some(item => removeShi(item[key]) === removeShi(normailized));
  };
}
export { MapStore };
