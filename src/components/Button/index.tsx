import React from 'react';
import { Button } from '@tarojs/components';
import { ButtonProps } from '@tarojs/components/types/Button';
import classNames from 'classnames';
import './index.scss';

interface IProps extends ButtonProps {
  children: React.ReactChild;
}
const MButton = (props: IProps) => {
  let _className = props.className;
  if (typeof _className === 'string') {
    _className = classNames(_className);
  }
  return <Button {...props} className={classNames('mbutton-default', _className)} />;
};

export default MButton;
