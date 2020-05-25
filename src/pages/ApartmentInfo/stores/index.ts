import { observable, action } from 'mobx';
import { TSetState, IApartment } from '@/types';

class ApartmentInfoStore {
  @observable public apartment?: IApartment;
  @observable public apartments: IApartment[] = [];
  @action setState: TSetState<ApartmentInfoStore> = next => {
    Object.assign(this, next);
  };
}
export { ApartmentInfoStore };
