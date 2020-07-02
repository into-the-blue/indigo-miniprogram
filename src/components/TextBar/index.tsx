import React from 'react';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import './style.scss';
import Text from '../Text';

interface IProps {
  title: string;
  content: string | number | boolean;
  titleClassName?: string;
  contentClassName?: string;
  titleStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

export const TextBar = ({
  title,
  content,
  titleClassName,
  titleStyle,
  contentClassName,
  contentStyle,
}: IProps) => {
  return (
    <View className={'text-bar__container'}>
      <Text className={classNames('text-bar__title', titleClassName)} style={titleStyle}>
        {title}
      </Text>

      <Text className={classNames('text-bar__content', contentClassName)} style={contentStyle}>
        {content}
      </Text>
    </View>
  );
};
