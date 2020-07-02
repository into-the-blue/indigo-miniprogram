import React, { useState, useEffect } from 'react';
import {} from 'taro-ui';
import { FlexView } from '../FlexView';
import { IApartment } from '@/types';
import { SortableHeader } from './SortableHeader';
import { ApartmentCard } from './ApartmentCard';
import get from 'lodash.get';
import { TActiveKey, TSortableKeys } from './types';

interface IProps {
  apartments: IApartment[];
  onPressApartment: (apartment: IApartment) => void;
  selectedApartmentHouseId?: string;
  visible?: boolean;
  textStyle?: React.CSSProperties;
}

export const ApartmentList = ({
  apartments,
  onPressApartment,
  selectedApartmentHouseId,
  visible = true,
  textStyle,
}: IProps) => {
  const [sortedKey, setSortedKey] = useState<TActiveKey | null>(null);
  const [sortedApartments, setSortedApartments] = useState<IApartment[]>([]);

  useEffect(() => {
    console.warn('[ApartmentList]', apartments.length);
    setSortedApartments([...apartments]);
  }, [apartments]);

  const onSort = (key: TSortableKeys) => (mode: null | 'asc' | 'desc') => {
    let nextSortedKeys: TActiveKey | null = { key, mode: mode! };
    if (mode === null) {
      nextSortedKeys = null;
    }
    // if (mode === null) {
    //   nextSortedKeys = sortedKeys.filter(o => o.key !== key);
    // }
    // else {
    // const idx = sortedKeys.findIndex(o => o.key === key);
    // if (idx === -1) {
    //   nextSortedKeys = sortedKeys.concat({ key, mode: mode! });
    // } else {
    //   nextSortedKeys = sortedKeys.map((o, i) => (i === idx ? { key, mode: mode! } : o));
    // }
    // }
    setSortedKey(nextSortedKeys);
    if (!nextSortedKeys) return setSortedApartments(apartments);
    const nextSortedApartments = [...sortedApartments].sort(sortApartment([nextSortedKeys]));
    setSortedApartments(nextSortedApartments);
  };
  if (!visible) return null;
  return (
    <FlexView column style={{ overflow: 'visible' }}>
      <FlexView className={'sortable-header__wrapper'}>
        {KEYS.map(item => (
          <SortableHeader
            style={item.style}
            key={item.key}
            title={item.title}
            onSort={onSort(item.key)}
            activeKey={get(sortedKey, 'key') === item.key ? sortedKey : null}
          />
        ))}
      </FlexView>
      <FlexView wrap style={{ padding: '0 7.5px' }}>
        {sortedApartments.map((apartment, idx) => (
          <ApartmentCard
            apartment={apartment}
            textStyle={textStyle}
            key={'apt' + idx}
            activeKey={get(sortedKey, 'key')}
            onPressApartment={() => onPressApartment(apartment)}
            isSelected={apartment.houseId === selectedApartmentHouseId}
          />
        ))}
      </FlexView>
    </FlexView>
  );
};

const KEYS: { title: string; key: TSortableKeys; style: React.CSSProperties }[] = [
  {
    title: '户型',
    key: 'houseType',
    style: { flex: 1 },
  },
  { title: '价格', key: 'price', style: { flex: 1 } },
  { title: '面积', key: 'area', style: { flex: 1 } },
  { title: '每平米价格', key: 'pricePerSquareMeter', style: { flex: 1 } },
];

const _compare = (a: string | number, b: string | number) => {
  if (typeof a === 'string') return a.localeCompare(b as string);
  return (a as number) - (b as number);
};

const sortApartment = (keys: TActiveKey[]) => (a: IApartment, b: IApartment) => {
  let res: any = 0;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const isAsc = key.mode === 'asc';
    const v1 = a[key.key] as 'string' | 'number';
    const v2 = b[key.key] as 'string' | 'number';
    if (v1 === v2) continue;
    res = isAsc ? _compare(v1, v2) : _compare(v2, v1);
    break;
  }
  return res;
};
