import { observable, action, computed } from 'mobx';
import { TSetState, IApartment } from '@/types';
import { findItemByKeyValue } from '@/utils';

class ApartmentInfoStore {
  @observable public initialApartment?: IApartment;
  @observable public selectedApartment?: IApartment;
  @observable public apartments: IApartment[] = [];
  @action setState: TSetState<ApartmentInfoStore> = next => {
    Object.assign(this, next);
  };

  // @computed get selectedApartment() {
  //   if (!this.selectedApartmentHouseId) return undefined;
  //   return findItemByKeyValue(this.apartments, this.selectedApartmentHouseId, 'houseId');
  // }
}
export { ApartmentInfoStore };
