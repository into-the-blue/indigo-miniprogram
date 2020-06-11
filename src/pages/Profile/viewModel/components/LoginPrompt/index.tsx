import React from 'react';
import {} from '@tarojs/components';
import { FlexView, Button } from '@/components';
import { AtNoticebar } from 'taro-ui';

interface IProps {
  onGrantWechatInfo: (arg: any) => void;
}

export const LoginPrompt = ({ onGrantWechatInfo }: IProps) => {
  return (
    <FlexView column style={{ flex: 1 }}>
      <AtNoticebar marquee>{'登录 登录 登录 登录'}</AtNoticebar>
      <AtNoticebar customStyle={{ marginTop: 10 }} marquee speed={150}>
        {'点啊, 此时不点更待何时??'}
      </AtNoticebar>
      <AtNoticebar customStyle={{ marginTop: 10 }} marquee speed={200}>
        {'林北辛辛苦苦开发出的app,还免费使用, 这都不登录?'}
      </AtNoticebar>
      <AtNoticebar customStyle={{ marginTop: 10 }} marquee speed={100}>
        {'app提供的服务均可免费使用'}
      </AtNoticebar>
      <AtNoticebar customStyle={{ marginTop: 10 }} marquee speed={120}>
        {'那你能点个登录吗?'}
      </AtNoticebar>
      <AtNoticebar customStyle={{ marginTop: 10 }} marquee speed={170}>
        {'一人给一块, 世界充满爱'}
      </AtNoticebar>
      <Button
        customStyle={{ width: '100%', marginTop: 30 }}
        openType={'getUserInfo'}
        type={'primary'}
        onGetUserInfo={onGrantWechatInfo}
      >
        {'登录'}
      </Button>
    </FlexView>
  );
};
