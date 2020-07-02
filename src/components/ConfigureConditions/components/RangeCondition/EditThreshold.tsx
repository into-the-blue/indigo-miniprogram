import React, { useState, useEffect } from 'react';
import { Button } from '@/components';
import { AtInput } from 'taro-ui';
import './styles.scss';
import classNames from 'classnames';
import { FlexView } from '@/components/FlexView';

interface IProps {
  value: string;
  onChange: (v: string) => string;
  lastValue: string;
  defaultValue: number;
  reverse?: boolean;
  showError?: true;
}

export const EditThreshold = ({
  value,
  onChange,
  reverse,
  lastValue,
  defaultValue,
  showError,
}: IProps) => {
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
    onChange(lastValue === '-1' ? `${defaultValue}` : lastValue);
  };

  const isNoLimit = mode === 'noLimit';
  const isInput = mode === 'input';
  const comp = [
    <Button
      className={classNames({
        'edit-threshold__button': true,
        'edit-threshold__no-limit-active': isNoLimit,
      })}
      key={'nolimit'}
      onClick={onPressNoLimit}
    >
      {'不限'}
    </Button>,
    isInput ? (
      <FlexView
        key={'ipt'}
        inset
        className={classNames({
          'edit-threshold__input-container': true,
          'edit-threshold__input-container-error': showError,
        })}
      >
        <AtInput
          className={classNames({
            'edit-threshold__input-input': true,
          })}
          type={'number'}
          name={'threshold' + (reverse ? 'r' : 'l')}
          value={value}
          onChange={onChange}
        />
      </FlexView>
    ) : (
      <Button
        className={classNames({
          'edit-threshold__button': true,
        })}
        onClick={onPressInput}
        key={'input'}
      >
        {'自定义'}
      </Button>
    ),
  ];
  if (reverse) comp.reverse();
  return <FlexView className={'edit-threshold__container'}>{comp}</FlexView>;
};
