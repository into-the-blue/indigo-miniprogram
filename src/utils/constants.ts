import Taro from '@tarojs/taro';

const systemInfo = Taro.getSystemInfoSync();
export const SCREEN_WIDTH = systemInfo.screenWidth;
export const SCREEN_HEIGHT = systemInfo.screenHeight;

let host = 'https://indigo.timvel.com';

if (process.env.NODE_ENV === 'development') {
  host = 'http://localhost:7000';
}
export const API_ENDPOINT = host + '/api/v1';

export const GRAPHQL_ENDPOINT = host + '/graphql';

export const MAP_SETTING = {
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
