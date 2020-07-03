import { IInteractor } from '../types';
import { NotificationRecordsStore } from '../stores';
import { SubscriptionClient } from '@/services/subscription';
import Taro from '@tarojs/taro';
import { ISubscriptionClient, ISubscriptionNotificationRecordClient } from '@/types';
import { SubscriptionStore } from '@/stores';
import { from, timer } from 'rxjs';
import { bufferCount, concatMap } from 'rxjs/operators';

class NotificationRecordsInteractor implements IInteractor {
  constructor(
    private notificationRecordsStore: NotificationRecordsStore,
    private subscriptionStore: SubscriptionStore,
  ) {}

  saveSubscription = (subscription: ISubscriptionClient) => {
    Taro.setNavigationBarTitle({
      title: subscription.address,
    });
    this.notificationRecordsStore.setState({
      subscriptionId: subscription.id,
      subscription,
      mapCentralCoordinates: subscription.coordinates,
    });
  };

  resetState = () => {
    this.notificationRecordsStore.resetStore();
  };

  queryNotificationRecords = async () => {
    try {
      this.notificationRecordsStore.onInitStart();
      const records = await SubscriptionClient.querySubscriptionNotificationRecords(
        this.notificationRecordsStore.subscriptionId!,
      );
      console.warn('[queryNotificationRecords]', records.length);
      this._setNotificationRecordsProgressively(records);
      this.notificationRecordsStore.setState({
        isLoading: false,
      });
      const unread = records.filter((o) => !o.viewed).map((o) => o.id);
      if (unread.length) {
        this.viewNotifications(unread);
      }
    } catch (err) {
      //
      this.notificationRecordsStore.onInitError();
    }
  };

  _setNotificationRecordsProgressively = (records: ISubscriptionNotificationRecordClient[]) => {
    from(records)
      .pipe(
        bufferCount(10),
        concatMap((rs) => {
          this.notificationRecordsStore.setNotificationRecords(rs, true);
          return timer(100);
        }),
      )
      .subscribe();
  };

  viewNotifications = (ids: string[]) => {
    SubscriptionClient.viewtNotifications(ids).catch((err) => {
      console.warn('[viewNotifications]', err.message);
    });
    this.subscriptionStore.readNotifications(this.notificationRecordsStore.subscriptionId!);
  };

  queryMoreNotificationRecords = async () => {
    try {
    } catch (err) {}
  };

  onPressRecord = (recordId: string) => {
    const {
      addOrRemoveRecordId,
      setRecordAsMapCentral,
      subscription,
      selectedRecordIds,
      setMapCentral,
    } = this.notificationRecordsStore;
    const isAdd = addOrRemoveRecordId(recordId);
    if (isAdd) {
      setRecordAsMapCentral(recordId);
    } else {
      if (selectedRecordIds.length) {
        setTimeout(() => setRecordAsMapCentral(selectedRecordIds[selectedRecordIds.length - 1]));
      } else {
        setTimeout(() => setMapCentral(subscription!.coordinates));
      }
    }
  };
}

export { NotificationRecordsInteractor };
