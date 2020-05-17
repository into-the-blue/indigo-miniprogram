import { observable, action, computed } from 'mobx';
import { TSetState, ISubscriptionNotificationRecordClient, ISubscriptionClient } from '@/types';
import { BaseViewStore } from '@/stores/extends';

class NotificationRecordsStore extends BaseViewStore {
  public subscriptionId?: string;
  @observable subscription?: ISubscriptionClient;
  @observable public notificationRecords: ISubscriptionNotificationRecordClient[] = [];
  @observable public noRecordsFound: boolean = false;
  @observable public selectedRecordIds: string[] = [];

  @action setState: TSetState<NotificationRecordsStore> = next => {
    Object.assign(this, next);
  };

  @action addOrRemoveRecordId = (id: string) => {
    const idx = this.selectedRecordIds.findIndex(i => i === id);
    if (idx === -1) return this.selectedRecordIds.push(id);
    this.selectedRecordIds.splice(idx, 1);
  };

  @computed get selectedRecords() {
    return this.selectedRecordIds.map(id => this.notificationRecords.find(r => r.id === id)!);
  }
}
export { NotificationRecordsStore };
