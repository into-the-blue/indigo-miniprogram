import React from 'react';
import classNames from 'classnames';
import './style.scss';
import Text from '../Text';
import { FlexView } from '../FlexView';

interface IProps {
  title: string;
  content: string | number | boolean;
  titleClassName?: string;
  contentClassName?: string;
  titleStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
}

export const TextBar = ({
  title,
  content,
  titleClassName,
  titleStyle,
  contentClassName,
  contentStyle,
  className,
  style,
}: IProps) => {
  return (
    <FlexView className={classNames('text-bar__container', className)} style={style}>
      <Text className={classNames('text-bar__title', titleClassName)} style={titleStyle}>
        {title}
      </Text>

      <Text className={classNames('text-bar__content', contentClassName)} style={contentStyle}>
        {content}
      </Text>
    </FlexView>
  );
};
