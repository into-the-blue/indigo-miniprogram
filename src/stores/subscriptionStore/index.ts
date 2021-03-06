import { action, observable } from 'mobx';
import { ISubscriptionClient } from '@/types';
import { removeItemByKeyValue } from '@/utils';

class SubscriptionStore {
  @observable userSubscriptions: ISubscriptionClient[] = [];

  setUserSubscriptions = (subscriptions: ISubscriptionClient[]) => {
    this.userSubscriptions = subscriptions;
  };

  findSubscriptionByCoordinates = (coordinates: [number, number]) => {
    return this.userSubscriptions.find(
      o => JSON.stringify(o.coordinates) === JSON.stringify(coordinates),
    );
  };

  @action
  removeSubscriptionById = (subscriptionId: string) => {
    this.userSubscriptions = removeItemByKeyValue(this.userSubscriptions, subscriptionId, 'id');
  };

  getSubscriptionById = (subscriptionId: string) => {
    return this.userSubscriptions.find(o => o.id === subscriptionId);
  };

  @action readNotifications = (subscriptionId: string) => {
    this.userSubscriptions = this.userSubscriptions.map(s => {
      if (s.id !== subscriptionId) return s;
      return {
        ...s,
        numOfUnreadNotificationRecords: 0,
      };
    });
  };
}

export { SubscriptionStore };
