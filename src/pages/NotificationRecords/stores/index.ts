import { observable, action } from 'mobx';
import { TSetState, ISubscriptionNotificationRecordClient } from '@/types';
import { BaseViewStore } from '@/stores/extends';

class NotificationRecordsStore extends BaseViewStore {
  public subscriptionId?: string;
  @observable public notificationRecords: ISubscriptionNotificationRecordClient[] = [];
  @observable public noRecordsFound: boolean = false;

  @action setState: TSetState<NotificationRecordsStore> = next => {
    Object.assign(this, next);
  };
}
export { NotificationRecordsStore };
