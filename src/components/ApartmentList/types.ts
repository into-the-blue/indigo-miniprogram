export type TSortableKeys = 'houseType' | 'price' | 'area' | 'pricePerSquareMeter';
export type TActiveKey = {
  key: TSortableKeys;
  mode: 'asc' | 'desc';
};