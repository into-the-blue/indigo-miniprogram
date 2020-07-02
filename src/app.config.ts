export default {
  pages: [
    'pages/Feed/builder/index',
    'pages/Profile/builder/index',
    'pages/index/index',
    'pages/EditSubscription/builder/index',
    'pages/NotificationRecords/builder/index',
    'pages/ApartmentInfo/builder/index',
    'pages/FreeMembership/builder/index',
    'pages/Search/builder/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '安隅',
    navigationBarTextStyle: 'black',
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于获取周边房源信息', // 高速公路行驶持续后台定位
    },
  },

  tabBar: {
    backgroundColor: '#white',

    borderStyle: 'white',

    selectedColor: '#ffc107',

    color: '#666666',

    list: [
      {
        pagePath: 'pages/Feed/builder/index',
        iconPath: './assets/images/home.png',
        selectedIconPath: './assets/images/home_active.png',
        text: '首页',
      },

      {
        pagePath: 'pages/Profile/builder/index',

        iconPath: './assets/images/profile.png',

        selectedIconPath: './assets/images/profile_active.png',

        text: '我的',
      },
    ],
  },
};
