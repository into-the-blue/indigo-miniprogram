import { observable, action } from 'mobx';
import { TSetState } from '@/types';
import { BaseViewStore } from '@/stores/extends';

class FreeMembershipStore extends BaseViewStore {
  @observable public remainingRedeemTimes: number = 0;
  @observable enable: boolean = true;
  @observable isLoading: boolean = false;

  @action setState: TSetState<FreeMembershipStore> = next => {
    Object.assign(this, next);
  };
}
export { FreeMembershipStore };
