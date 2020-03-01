import { observable, action } from 'mobx';
import { IStore, nextState } from '@/types';

class MapStore implements IStore<MapStore> {
  @observable currentCoordinate?: {
    lng: number;
    lat: number;
  };

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
}
export { MapStore };
