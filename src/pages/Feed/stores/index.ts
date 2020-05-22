import { observable, action } from 'mobx';
import { nextState, IApartment } from '@/types';

class FeedStore {
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
}
export { FeedStore };
