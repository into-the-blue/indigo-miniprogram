import React, { useState } from 'react';
import { FlexView } from '../FlexView';
import { Text, Image } from '@tarojs/components';
import classNames from 'classnames';
import './styles.scss';
import Assets from '@/assets';

interface IProps {
  title: string;
  onSort: (mode: null | 'asc' | 'desc') => void;
  style?: React.CSSProperties;
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
export const SortableHeader = ({ title, onSort, style }: IProps) => {
  const [currentMode, setMode] = useState<null | 'asc' | 'desc'>(null);
  const isAsc = currentMode === 'asc';

  const _setNextMode = () => {
    const next = getNextMode(currentMode);
    setMode(next);
    return next;
  };
  return (
    <FlexView
      className={'sortable-header__container'}
      onClick={() => onSort(_setNextMode())}
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
        <Image src={isAsc ? Assets.Asc : Assets.Desc} className={'sortable-header__icon'} />
      )}
    </FlexView>
  );
};
