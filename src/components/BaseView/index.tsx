import React from 'react';
import { View, Text } from '@tarojs/components';
import Button from '../Button';
import { AtActivityIndicator } from 'taro-ui';

interface IProps {
  isLoading?: boolean;
  isError?: boolean;
  onPressRetry?: () => void;
  showPlaceholder?: boolean;
  renderPlaceholder?: () => JSX.Element;
  children: React.ReactChild | (React.ReactChild | null | undefined)[] | null | undefined;
}
export const BaseView = ({
  isLoading,
  children,
  isError,
  onPressRetry,
  showPlaceholder,
  renderPlaceholder,
}: IProps) => {
  if (showPlaceholder) {
    if (renderPlaceholder) return renderPlaceholder();
    return <View></View>;
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, position: 'relative', paddingTop: 40 }}>
        <AtActivityIndicator mode={'center'} isOpened content={'Loading...'} />
      </View>
    );
  }
  if (isError) {
    return (
      <View>
        <Text>{'出错啦'}</Text>
        <Button onClick={onPressRetry} type={'danger'}>
          {'重试'}
        </Button>
      </View>
    );
  }
  return <React.Fragment>{children}</React.Fragment>;
};
