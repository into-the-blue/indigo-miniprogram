import { IApartment } from '@/types';

export type XApartmentInfoInit = {
  ApartmentInfo_init: {
    guaranteed: true;
    data: {
      apartment: IApartment;
      apartments?: IApartment[];
    };
  };
};
