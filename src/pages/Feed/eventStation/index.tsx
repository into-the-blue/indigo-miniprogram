import { IMetroStation, IPOI } from '@/types';

export type XFeedSetMapFocusedPosition = {
  Feed_setMapFocusedPosition: {
    data:
      | {
          type: 'metroStation';
          payload: IMetroStation;
        }
      | {
          type: 'customLocation';
          payload: IPOI;
        };
  };
};
