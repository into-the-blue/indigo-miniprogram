import { action, observable, computed } from 'mobx';
import { ISubscriptionClient } from '@/types';

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
    this.userSubscriptions = this.userSubscriptions.filter(o => o.id !== subscriptionId);
  };
}

export { SubscriptionStore };
