import React from 'react';
import { AtTabBar } from 'taro-ui';

export const Tabbar = () => {
  return (
    <AtTabBar
      fixed
      selectedColor={'#d43c33'}
      tabList={[
        { title: '发现', iconPrefixClass: 'fa', iconType: 'feed' },
        { title: '我的', iconPrefixClass: 'fa', iconType: 'music' },
      ]}
      onClick={() => {}}
      current={0}
      //   onClick={this.switchTab.bind(this)}
      //   current={this.state.current}
    />
  );
};
