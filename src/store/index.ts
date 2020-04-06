import {} from 'mobx';
import { FeedStore } from '../pages/Feed/stores';
import { GlobalStore } from './global';
import { MapStore } from './map';
import { UserStore } from './user';
import { SubscriptionStore } from './subscription/subscription.store';

class RootStore {
  feed: FeedStore;
  global: GlobalStore;
  mMap: MapStore;
  userStore: UserStore;
  subscriptionStore: SubscriptionStore;
  constructor() {
    this.feed = new FeedStore();
    this.global = new GlobalStore();
    this.mMap = new MapStore();
    this.userStore = new UserStore();
    this.subscriptionStore = new SubscriptionStore();
  }
}
const store = new RootStore();
export default store;

export const getStores: <K extends keyof RootStore>(...keys: K[]) => Pick<RootStore, K> = (
  ...stores
) => {
  const res: any = {};
  for (let key of stores) {
    if (!store[key]) throw new Error('store not exists');
    else res[key] = store[key];
  }
  return res;
};
export { GlobalStore, FeedStore, MapStore, UserStore, SubscriptionStore };
