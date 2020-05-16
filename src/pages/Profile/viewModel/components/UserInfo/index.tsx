import React from 'react';
import { View, Text } from '@tarojs/components';
import { AtAvatar } from 'taro-ui';
import { IUserInfo } from '@/types';
import { get } from 'lodash';

const UserInfo = ({ userInfo }: { userInfo: IUserInfo }) => {
  return (
    <View className={'row-center'}>
      <AtAvatar image={get(userInfo, 'avatar')} size={'normal'} />
      <Text style={{ marginLeft: 10 }}>{get(userInfo, 'username')}</Text>
    </View>
  );
};

export { UserInfo };
