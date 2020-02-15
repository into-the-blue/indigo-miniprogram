import {} from 'mobx';
// import { FeedStore } from '../pages/Feed/stores';
import { GlobalStore } from './global';

class RootStore {
  //   feed: FeedStore;
  global: GlobalStore;
  constructor() {
    // this.feed = new FeedStore();
    this.global = new GlobalStore();
  }
}

export default new RootStore();
export { GlobalStore };
