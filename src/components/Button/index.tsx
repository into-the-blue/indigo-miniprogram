import React from 'react';
import { AtButton } from 'taro-ui';
import { AtButtonProps } from 'taro-ui/types/button';
import classNames from 'classnames';
import './index.scss';

interface IProps extends Omit<AtButtonProps, 'type'> {
  children: React.ReactChild;
  type?: 'default' | 'primary' | 'danger';
}
const MButton = (props: IProps) => {
  let _className = props.className;
  if (typeof _className === 'string') {
    _className = classNames(_className);
  }
  const _type = props.type || 'default';
  const styles = classNames({
    mbutton: true,
    [`mbutton-${_type}`]: true,
  });

  return <AtButton {...props} type={undefined} className={classNames(styles, _className)} />;
};

export default MButton;
