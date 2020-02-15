export default {
  pages: ['pages/Feed/builder/index', 'pages/index/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '青鸟',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#626567',
    selectedColor: '#2A8CE5',
    backgroundColor: '#FBFBFB',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/Feed/builder/index',
        text: 'aaaa',
        // iconPath: "./asset/images/index.png",
        // selectedIconPath: "./asset/images/index_focus.png"
      },
      {
        pagePath: 'pages/Feed/builder/index',
        text: '我的',
        // iconPath: "./asset/images/burger.png",
        // selectedIconPath: "./asset/images/burger_focus.png"
      },
    ],
  },
};
