import React, { useState } from 'react';
import { FlexView } from '../FlexView';
import { Image } from '@tarojs/components';
import classNames from 'classnames';
import './styles.scss';
import Assets from '@/assets';
import Text from '../Text';
import { TActiveKey } from './types';
import get from 'lodash.get';

interface IProps {
  title: string;
  onSort: (mode: null | 'asc' | 'desc') => void;
  style?: React.CSSProperties;
  activeKey: TActiveKey | null;
}

const getNextMode = (current: null | 'asc' | 'desc') => {
  switch (current) {
    case null: {
      return 'asc';
    }
    case 'asc': {
      return 'desc';
    }
    case 'desc': {
      return null;
    }
  }
};
export const SortableHeader = ({ title, onSort, style, activeKey }: IProps) => {
  const currentMode = get(activeKey, 'mode', null);
  const isAsc = currentMode === 'asc';
  const _setNextMode = () => {
    const next = getNextMode(get(activeKey, 'mode', null));
    // setMode(next);
    onSort(next);
    return next;
  };
  return (
    <FlexView
      className={classNames('sortable-header__container', {
        'sortable-header__container-active': currentMode !== null,
      })}
      onClick={() => _setNextMode()}
      alignItems={'center'}
      style={style}
    >
      <Text
        className={classNames('sortable-header__title', {
          'sortable-header__title-active': currentMode !== null,
        })}
      >
        {title}
      </Text>
      {currentMode !== null && (
        <Text style={{ fontSize: 11 }}>{!isAsc ? '⬇️' : '⬆️'}</Text>
        // <Image src={isAsc ? Assets.Asc : Assets.Desc} className={'sortable-header__icon'} />
      )}
    </FlexView>
  );
};
