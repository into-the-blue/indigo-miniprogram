import { action, observable, computed } from 'mobx';
import { ISubscription } from '@/types';

class SubscriptionStore {
  @observable userSubscriptions: ISubscription[] = [];

  setUserSubscriptions = (subscriptions: ISubscription[]) => {
    this.userSubscriptions = subscriptions;
  };

  findSubscriptionByCoordinates = (coordinates: [number, number]) => {
    return this.userSubscriptions.find(
      o => JSON.stringify(o.coordinates) === JSON.stringify(coordinates),
    );
  };
}

export { SubscriptionStore };
