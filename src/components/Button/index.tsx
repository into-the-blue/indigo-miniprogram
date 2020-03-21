import React from 'react';
import { Button } from '@tarojs/components';
import { ButtonProps } from '@tarojs/components/types/Button';
import classNames from 'classnames';
import './index.scss';

interface IProps extends ButtonProps {
  children: React.ReactChild;
}
const MButton = (props: IProps) => {
  return <Button className={classNames('mbutton-default')} {...props} />;
};

export default MButton;
