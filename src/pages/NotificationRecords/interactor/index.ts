import { IInteractor } from '../types';
import { NotificationRecordsStore } from '../stores';
import { SubscriptionClient } from '@/services/subscription';

class NotificationRecordsInteractor implements IInteractor {
  constructor(private notificationRecordsStore: NotificationRecordsStore) {}

  saveSubscriptionId = (subscriptionId: string) => {
    this.notificationRecordsStore.setState({
      subscriptionId,
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
}

export { NotificationRecordsInteractor };
