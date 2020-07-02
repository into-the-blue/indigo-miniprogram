import React from 'react';
import { View } from '@tarojs/components';
import Button from '../Button';
import { AtActivityIndicator } from 'taro-ui';
import { FlexView, IFlexViewProps } from '../FlexView';
import { Text } from '@/components';

interface IProps extends IFlexViewProps {
  isLoading?: boolean;
  isError?: boolean;
  onPressRetry?: () => void;
  showPlaceholder?: boolean;
  renderPlaceholder?: () => JSX.Element;
  children:
    | React.ReactChild
    | (React.ReactChild | null | undefined)[]
    | null
    | undefined
    | false
    | string
    | any;
  className?: string;
  style?: React.CSSProperties;
}
export const BaseView = ({
  isLoading,
  children,
  isError,
  onPressRetry,
  showPlaceholder,
  renderPlaceholder,
  ...restProps
}: IProps) => {
  if (showPlaceholder) {
    if (renderPlaceholder) return renderPlaceholder();
    return <View></View>;
  }
  if (isLoading) {
    return (
      <FlexView style={{ flex: 1, position: 'relative', paddingTop: 40 }}>
        <AtActivityIndicator mode={'center'} isOpened content={'Loading...'} />
      </FlexView>
    );
  }
  if (isError) {
    return (
      <FlexView column>
        <Text style={{ alignSelf: 'center' }}>{'出错啦'}</Text>
        <Button onClick={onPressRetry} type={'danger'}>
          {'重试'}
        </Button>
      </FlexView>
    );
  }
  return (
    <FlexView column {...restProps}>
      {children}
    </FlexView>
  );
};
