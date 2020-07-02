import React from 'react';
import { Text } from '@tarojs/components';
import { TextProps } from '@tarojs/components/types/Text';
import classNames from 'classnames';
import './styles.scss';

interface IProps extends TextProps {
  children?: React.ReactChild;
}

const MText = ({ className, ...restProps }: IProps) => {
  return <Text className={classNames('mtext__default', className)} {...restProps} />;
};

export default MText;
