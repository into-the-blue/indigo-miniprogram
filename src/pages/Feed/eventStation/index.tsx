import { IMetroStation, IPOI } from '@/types';

export type XFeedSetMapFocusedPosition = {
  Feed_setMapFocusedPosition: {
    data:
      | {
          type: 'metroStation';
          coordinates: [number, number];
          payload?: IMetroStation;
          address: undefined;
          city: undefined;
        }
      | {
          type: 'customLocation';
          coordinates: [number, number];
          address: string;
          city: string;
          payload?: IPOI;
        };
  };
};
