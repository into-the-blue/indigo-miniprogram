import { IInteractor } from '../types';
import { FreeMembershipStore } from '../stores';

class FreeMembershipInteractor implements IInteractor {
  constructor(private viewStore: FreeMembershipStore) {}

  getFreeMembershipInfo = async () => {
    try {
    } catch (err) {
      console.warn('[getFreeMembershipInfo]', err);
    }
  };
}

export { FreeMembershipInteractor };
