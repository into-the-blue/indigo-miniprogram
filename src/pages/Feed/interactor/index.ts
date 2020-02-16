import { IInteractor } from '../types';
import { FeedStore } from '../stores';

class FeedInteractor implements IInteractor {
  constructor(public feed: FeedStore) {}
}

export { FeedInteractor };
