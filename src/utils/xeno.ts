import { Xeno } from '@/xeno';
import { XApartmentInfoInit } from '@/pages/ApartmentInfo/eventStation';
import { XEditSubscriptionInit } from '@/pages/EditSubscription/eventStation';
import { XNotificationRecordsInit } from '@/pages/NotificationRecords/eventStation';

export type XAllEvents = XApartmentInfoInit & XEditSubscriptionInit & XNotificationRecordsInit;

export const createXeno = () => {
  const xeno = new Xeno<XAllEvents>();
  return xeno;
};