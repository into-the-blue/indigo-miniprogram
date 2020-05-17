import { IInteractor } from '../types';
import { NotificationRecordsStore } from '../stores';
import { SubscriptionClient } from '@/services/subscription';
import { SubscriptionStore } from '@/stores';

class NotificationRecordsInteractor implements IInteractor {
  constructor(
    private notificationRecordsStore: NotificationRecordsStore,
    private subscriptionStore: SubscriptionStore,
  ) {}

  saveSubscriptionId = (subscriptionId: string) => {
    this.notificationRecordsStore.setState({
      subscriptionId,
      subscription: this.subscriptionStore.getSubscriptionById(subscriptionId),
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
    this.notificationRecordsStore.addOrRemoveRecordId(recordId);
  };
}

export { NotificationRecordsInteractor };
