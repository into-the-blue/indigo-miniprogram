import { Xeno } from '@/xeno';
import { XApartmentInfoInit } from '@/pages/ApartmentInfo/eventStation';

export type XAllEvents = XApartmentInfoInit;

export const createXeno = () => {
  const xeno = new Xeno<XAllEvents>();
  return xeno;
};
