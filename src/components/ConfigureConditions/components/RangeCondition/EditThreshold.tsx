import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import { Button } from '@/components';
import { AtInput } from 'taro-ui';
import './styles.scss';
import classNames from 'classnames';

interface IProps {
  value: string;
  onChange: (v: string) => string;
  lastValue: string;
  reverse?: boolean;
}

export const EditThreshold = ({ value, onChange, reverse, lastValue }: IProps) => {
  const [mode, setMode] = useState<'noLimit' | 'input'>('input');
  useEffect(() => {
    if (value === '-1' && mode === 'input') {
      setMode('noLimit');
    }
    if (value !== '-1' && mode === 'noLimit') {
      setMode('input');
    }
  }, [value, mode]);

  const onPressNoLimit = () => {
    setMode('noLimit');
    onChange('-1');
  };

  const onPressInput = () => {
    setMode('input');
    onChange(lastValue);
  };

  const isNoLimit = mode === 'noLimit';
  const isInput = mode === 'input';
  const comp = [
    <Button
      className={classNames({
        'edit-threshold__button': true,
        'edit-threshold__no-limit-left': !reverse,
        'edit-threshold__no-limit-right': reverse,
        'edit-threshold__no-limit-active': isNoLimit,
      })}
      key={'nolimit'}
      onClick={onPressNoLimit}
    >
      {'不限'}
    </Button>,
    isInput ? (
      <View
        key={'ipt'}
        className={classNames({
          'edit-threshold__input-container': true,
        })}
      >
        <AtInput
          className={classNames({
            'edit-threshold__input-input': true,
          })}
          type={'number'}
          name={'threshold' + reverse ? 'r' : 'l'}
          value={value}
          onChange={onChange}
        />
      </View>
    ) : (
      <Button
        className={classNames({
          'edit-threshold__input': !reverse,
          'edit-threshold__button': true,
          'edit-threshold__input-left': reverse,
        })}
        onClick={onPressInput}
        key={'input'}
      >
        {'自定义'}
      </Button>
    ),
  ];
  if (reverse) comp.reverse();
  return <View className={'edit-threshold__container'}>{comp}</View>;
};
