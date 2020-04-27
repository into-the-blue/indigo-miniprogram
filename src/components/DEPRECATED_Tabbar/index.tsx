import React from 'react';
import Taro from '@tarojs/taro';
import { AtTabBar } from 'taro-ui';
import { observer, inject } from 'mobx-react';
import { GlobalStore } from '@/store';

interface IProps {
  global?: GlobalStore;
}

const Tabbar = ({ global }: IProps) => {
  const { currentTabIndex, onPressTab } = global!;
  const onClick = (index: number) => {
    console.warn(index);
    if (index === currentTabIndex) return;
    onPressTab(index);
    switch (index) {
      case 0:
        Taro.redirectTo({
          url: '/pages/Feed/builder/index',
        });
      case 1:
        Taro.redirectTo({
          url: '/pages/Profile/builder/index',
        });
    }
  };
  return (
    <AtTabBar
      fixed
      current={currentTabIndex}
      tabList={[
        {
          title: '首页',
        },
        {
          title: '我的',
        },
      ]}
      onClick={onClick}
    />
  );
};

export default inject('global')(observer(Tabbar));
