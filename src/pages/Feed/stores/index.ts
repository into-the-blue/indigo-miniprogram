import { observable, action } from 'mobx';
import { IStore, nextState } from '@/types';

class FeedStore {
  @action setState: <K extends keyof FeedStore>(next: nextState<FeedStore, K>) => void = next => {
    Object.assign(this, next);
  };
}
export { FeedStore };
