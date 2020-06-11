import Taro from '@tarojs/taro';

const systemInfo = Taro.getSystemInfoSync();
export const SCREEN_WIDTH = systemInfo.screenWidth;
export const SCREEN_HEIGHT = systemInfo.screenHeight;

let host = 'https://api.indigo.timvel.com';

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

export const UNITS = {
  squreMeter: '㎡',
  CNY: '¥',
  pricePerSquareMeter: '¥/㎡',
};

export const Routes = {
  ApartmentInfo: '/pages/ApartmentInfo/builder/index',
  EditSubscription: '/pages/EditSubscription/builder/index',
  Feed: '/pages/Feed/builder/index',
  NotificationRecords: '/pages/NotificationRecords/builder/index',
  Profile: '/pages/Profile/builder/index',
  FreeMembership: '/pages/FreeMembership/builder/index',
  Search: '/pages/Search/builder/index',
};
export const WX_TEMPLATE_ID = process.env.WX_TEMPLATE_ID;
