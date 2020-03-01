import {} from 'mobx';
import { FeedStore } from '../pages/Feed/stores';
import { GlobalStore } from './global';
import { MapStore } from './map';

class RootStore {
  feed: FeedStore;
  global: GlobalStore;
  mMap: MapStore;
  constructor() {
    this.feed = new FeedStore();
    this.global = new GlobalStore();
    this.mMap = new MapStore();
  }
}
const store = new RootStore();
export default store;

export const useStores: <K extends keyof RootStore>(...keys: K[]) => Pick<RootStore, K> = (
  ...stores
) => {
  const res: any = {};
  for (let key of stores) {
    if (!store[key]) throw new Error('store not exists');
    else res[key] = store[key];
  }
  return res;
};
export { GlobalStore, FeedStore, MapStore };
