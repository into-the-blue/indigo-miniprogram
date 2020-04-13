let host = 'https://indigo.timvel.com';

if (process.env.NODE_ENV === 'development') {
  host = 'http://localhost:7000';
}
const API_ENDPOINT = host + '/api/v1';

const GRAPHQL_ENDPOINT = host + '/graphql';

const MAP_SETTING = {
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

export { API_ENDPOINT, GRAPHQL_ENDPOINT, MAP_SETTING };
