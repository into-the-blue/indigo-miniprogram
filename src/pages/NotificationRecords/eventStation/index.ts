import { ISubscriptionClient } from '@/types';

export type XNotificationRecordsInit = {
  NotificationRecords_init: {
    guaranteed: true;
    data: {
      subscription: ISubscriptionClient;
    };
  };
};
