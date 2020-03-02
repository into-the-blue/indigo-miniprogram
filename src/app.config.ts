export default {
  pages: [
    'pages/Feed/builder/index',
    'pages/Profile/builder/index',
    // 'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '青鸟',
    navigationBarTextStyle: 'black',
  },
  "permission": {
    "scope.userLocation": {
      "desc": "你的位置信息将用于获取周边房源信息" // 高速公路行驶持续后台定位
    }
  }
};
