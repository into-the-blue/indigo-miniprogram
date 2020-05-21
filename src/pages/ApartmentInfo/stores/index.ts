import { observable, action } from 'mobx';
import { TSetState } from '@/types';

class ApartmentInfoStore {
  @observable public count: number = 0;
  @action setState: TSetState<ApartmentInfoStore> = next => {
    Object.assign(this, next);
  };
}
export { ApartmentInfoStore };
