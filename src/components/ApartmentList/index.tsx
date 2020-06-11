import React, { useState, useEffect } from 'react';
import {} from 'taro-ui';
import { FlexView } from '../FlexView';
import { IApartment } from '@/types';
import { SortableHeader } from './SortableHeader';
import { ApartmentCard } from './ApartmentCard';

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
  const [sortedKeys, setSortedKeys] = useState<TActiveKey[]>([]);
  const [sortedApartments, setSortedApartments] = useState<IApartment[]>([]);

  useEffect(() => {
    console.warn('[ApartmentList]', apartments.length);
    setSortedApartments([...apartments]);
  }, [apartments]);

  const onSort = (key: TSortableKeys) => (mode: null | 'asc' | 'desc') => {
    let nextSortedKeys = [...sortedKeys];
    if (mode === null) {
      nextSortedKeys = sortedKeys.filter(o => o.key !== key);
    } else {
      const idx = sortedKeys.findIndex(o => o.key === key);
      if (idx === -1) {
        nextSortedKeys = sortedKeys.concat({ key, mode: mode! });
      } else {
        nextSortedKeys = sortedKeys.map((o, i) => (i === idx ? { key, mode: mode! } : o));
      }
    }
    setSortedKeys(nextSortedKeys);
    if (!nextSortedKeys.length) return setSortedApartments(apartments);
    const nextSortedApartments = [...sortedApartments].sort(sortApartment(nextSortedKeys));
    setSortedApartments(nextSortedApartments);
  };
  if (!visible) return null;
  return (
    <FlexView column style={{ backgroundColor: 'white' }}>
      <FlexView>
        {KEYS.map(item => (
          <SortableHeader
            style={item.style}
            key={item.key}
            title={item.title}
            onSort={onSort(item.key)}
          />
        ))}
      </FlexView>
      {sortedApartments.map((apartment, idx) => (
        <ApartmentCard
          apartment={apartment}
          textStyle={textStyle}
          key={'apt' + idx}
          onPressApartment={() => onPressApartment(apartment)}
          isSelected={apartment.houseId === selectedApartmentHouseId}
        />
      ))}
    </FlexView>
  );
};

type TSortableKeys = 'houseType' | 'price' | 'area' | 'pricePerSquareMeter';
type TActiveKey = {
  key: TSortableKeys;
  mode: 'asc' | 'desc';
};

const KEYS: { title: string; key: TSortableKeys; style: React.CSSProperties }[] = [
  {
    title: '户型',
    key: 'houseType',
    style: { flex: 0.3 },
  },
  { title: '价格', key: 'price', style: { flex: 0.25 } },
  { title: '面积', key: 'area', style: { flex: 0.2 } },
  { title: '每平米价格', key: 'pricePerSquareMeter', style: { flex: 0.25 } },
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
