export type TConfigRange = {
  type: 'range';
  key: string;
  title: string;
  condition: [number, number];
};
export type TConfigBoolean = {
  type: 'boolean';
  key: string;
  title: string;
  condition: [string, string];
};

export const CONFIGURABLE_KEYS: (TConfigRange | TConfigBoolean)[] = [
  {
    key: 'area',
    type: 'range',
    title: '面积',
    condition: [1, 150],
  },
  {
    key: 'price',
    type: 'range',
    title: '价格',
    condition: [100, 20000],
  },
  {
    key: 'pricePerSquareMeter',
    type: 'range',
    title: '每平米价格',
    condition: [10, 1000],
  },
  {
    key: 'type',
    type: 'boolean',
    title: '出租类型',
    condition: ['合租', '整租'],
  },
  {
    key: 'isApartment',
    type: 'boolean',
    title: '是否公寓',
    condition: ['否', '是'],
  },
];
