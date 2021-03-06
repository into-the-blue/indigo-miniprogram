import { TConfigBoolean, TConfigRange } from '@/types';

export const CONFIGURABLE_KEYS: (TConfigRange | TConfigBoolean)[] = [
  {
    key: 'area',
    type: 'range',
    title: '面积',
    value: [10, 100],
  },
  {
    key: 'price',
    type: 'range',
    title: '价格',
    value: [1500, 8000],
  },
  {
    key: 'pricePerSquareMeter',
    type: 'range',
    title: '每平米价格',
    value: [50, 200],
  },
  {
    key: 'type',
    type: 'boolean',
    title: '出租类型',
    value: ['合租', '整租'],
  },
  {
    key: 'isApartment',
    type: 'boolean',
    title: '是否公寓',
    value: ['否', '是'],
  },
];
