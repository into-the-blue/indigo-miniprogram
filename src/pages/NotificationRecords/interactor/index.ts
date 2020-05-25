import { IInteractor } from '../types';
import { NotificationRecordsStore } from '../stores';
import { SubscriptionClient } from '@/services/subscription';
import { SubscriptionStore } from '@/stores';
import Taro from '@tarojs/taro';
import { ISubscriptionClient } from '@/types';

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

  queryNotificationRecords = async () => {
    try {
      this.notificationRecordsStore.onInitStart();
      const records = await SubscriptionClient.querySubscriptionNotificationRecords(
        this.notificationRecordsStore.subscriptionId!,
      );
      console.warn('[queryNotificationRecords]', records);
      this.notificationRecordsStore.setState({
        notificationRecords: records,
        isLoading: false,
      });
    } catch (err) {
      //
      this.notificationRecordsStore.onInitError();
    }
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
        setRecordAsMapCentral(selectedRecordIds[selectedRecordIds.length - 1]);
      } else {
        setMapCentral(subscription!.coordinates);
      }
    }
  };
}

export { NotificationRecordsInteractor };
