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
}

export { SubscriptionStore };
