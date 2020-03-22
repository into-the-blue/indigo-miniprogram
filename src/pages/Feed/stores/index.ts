import { observable, action } from 'mobx';
import { IStore, nextState, IApartment } from '@/types';

class FeedStore {
  currentApartment?: IApartment;
  @observable showDetailModal: boolean = false;
  @action setState: <K extends keyof FeedStore>(next: nextState<FeedStore, K>) => void = next => {
    Object.assign(this, next);
  };

  @action showApartmentDetail = (apartment: IApartment) => {
    this.currentApartment = apartment;
    this.showDetailModal = true;
  };

  @action closeApartmentDetail = () => {
    this.showDetailModal = false;
    this.currentApartment = undefined;
  };
}
export { FeedStore };
