import React from 'react';
import { Button } from '@tarojs/components';
import { ButtonProps } from '@tarojs/components/types/Button';
import classNames from 'classnames';

const MButton = (props: ButtonProps) => {
  return <Button className={classNames('mbutton-default')} {...props} />;
};

export default MButton;
