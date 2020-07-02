import React from 'react';
import { AtAvatar } from 'taro-ui';
import { IUserInfo } from '@/types';
import get from 'lodash.get';
import { FlexView, Button, Text } from '@/components';
import './styles.scss';

const UserInfo = ({
  userInfo,
  onPressOpenNotification,
  messageGranted,
}: {
  userInfo: IUserInfo;
  onPressOpenNotification: () => void;
  messageGranted: boolean;
}) => {
  return (
    <FlexView className={'user-info__container'}>
      <FlexView>
        <AtAvatar image={get(userInfo, 'avatar')} size={'normal'} />
        <Text style={{ marginLeft: 10 }}>{get(userInfo, 'username')}</Text>
      </FlexView>
      {!messageGranted && (
        <Button
          className={'user-info__message-button'}
          onClick={onPressOpenNotification}
        >
          {'允许通知'}
        </Button>
      )}
    </FlexView>
  );
};

export { UserInfo };
