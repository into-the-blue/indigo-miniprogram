import { observable, action } from 'mobx';
import { IStore, nextState, IApartment } from '@/types';

class FeedStore {
  currentApartment?: IApartment;
  @observable showDetailModal: boolean = false;
  @observable showApartmentListModal: boolean = false;

  @action setState: <K extends keyof FeedStore>(next: nextState<FeedStore, K>) => void = next => {
    Object.assign(this, next);
  };

  @action openApartmentList = () => {
    this.showApartmentListModal = true;
  };

  @action dismissApartmentList = () => {
    this.showApartmentListModal = false;
  };

  @action showApartmentDetail = (apartment: IApartment) => {
    this.currentApartment = apartment;
    this.showDetailModal = true;
    this.showApartmentListModal = true;
  };

  @action closeApartmentDetail = () => {
    if (this.showApartmentListModal) {
      this.showApartmentListModal = false;
      return;
    }
    this.showDetailModal = false;
    this.currentApartment = undefined;
  };
}
export { FeedStore };
