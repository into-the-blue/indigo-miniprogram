import { observable, action, computed } from 'mobx';
import { TSetState, ISubscriptionNotificationRecordClient, ISubscriptionClient } from '@/types';
import { BaseViewStore } from '@/stores/extends';
import { findItemByKeyValue } from '@/utils';

class NotificationRecordsStore extends BaseViewStore {
  public subscriptionId?: string;
  @observable subscription?: ISubscriptionClient;
  @observable public notificationRecords: ISubscriptionNotificationRecordClient[] = [];
  @observable public noRecordsFound: boolean = false;
  @observable public selectedRecordIds: string[] = [];
  @observable public mapCentralCoordinates?: [number, number];

  @action setState: TSetState<NotificationRecordsStore> = next => {
    Object.assign(this, next);
  };

  @action setMapCentral = (coordinates: [number, number]) => {
    this.mapCentralCoordinates = coordinates;
  };

  /**
   *
   *
   * @memberof NotificationRecordsStore
   * return boolean
   */
  @action addOrRemoveRecordId = (id: string) => {
    const idx = this.selectedRecordIds.findIndex(i => i === id);
    if (idx === -1) {
      this.selectedRecordIds.push(id);
      return true;
    }
    this.selectedRecordIds.splice(idx, 1);
    return false;
  };

  @action setNotificationRecords = (
    records: ISubscriptionNotificationRecordClient[],
    concat: boolean = false,
  ) => {
    if (concat) {
      this.notificationRecords = this.notificationRecords.concat(records);
    } else {
      this.notificationRecords = records;
    }
  };

  setRecordAsMapCentral = (recordId: string) => {
    const record = this.getRecordById(recordId);
    this.setMapCentral(record?.apartment!.coordinates!);
  };

  getRecordById = (id: string) => {
    return findItemByKeyValue(this.notificationRecords, id, 'id');
  };

  @observable resetStore = () => {
    this.notificationRecords = [];
    this.subscription = undefined;
    this.subscriptionId = undefined;
    this.selectedRecordIds = [];
    this.mapCentralCoordinates = undefined;
    this.noRecordsFound = false;
    this.isError = false;
    this.isLoading = false;
  };
  @computed get selectedRecords() {
    return this.selectedRecordIds.map(id => this.notificationRecords.find(r => r.id === id)!);
  }
}
export { NotificationRecordsStore };
