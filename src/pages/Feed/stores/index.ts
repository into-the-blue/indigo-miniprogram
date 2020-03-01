import { observable, action } from 'mobx';
import { IStore } from '@/types';

class FeedStore implements IStore<FeedStore> {
  @action setState = nextState => {
    Object.assign(this, nextState);
  };
}
export { FeedStore };
