import React from 'react';
import { View, Text } from '@tarojs/components';
import { AtAvatar } from 'taro-ui';
import { IUserInfo } from '@/types';
import { get } from 'lodash';
import { FlexView } from '@/components';

const UserInfo = ({ userInfo }: { userInfo: IUserInfo }) => {
  return (
    <FlexView paddingHorizontal={15}>
      <AtAvatar image={get(userInfo, 'avatar')} size={'normal'} />
      <Text style={{ marginLeft: 10 }}>{get(userInfo, 'username')}</Text>
    </FlexView>
  );
};

export { UserInfo };
