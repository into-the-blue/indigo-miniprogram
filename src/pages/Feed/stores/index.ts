import { observable, action } from 'mobx';
import { nextState, IApartment } from '@/types';

class FeedStore {
  @observable showApartmentListModal: boolean = false;
  @observable locationAuthorized: boolean = true;
  @observable noticeMessage: string | null = null;
  @observable isQueryingAptsNearby: boolean = false;
  @observable apartmentsNearby?: {
    coordinates: [number, number];
    apartments: IApartment[];
  };

  @action toggleIsQueryingAptsNearby = () => {
    this.isQueryingAptsNearby = !this.isQueryingAptsNearby;
  };

  @action setLocationAuthorized = (bool: boolean) => {
    this.locationAuthorized = bool;
  };

  @action setState: <K extends keyof FeedStore>(next: nextState<FeedStore, K>) => void = next => {
    Object.assign(this, next);
  };

  @action setApartmentsNearby = (coordinates: [number, number], apartments: IApartment[]) => {
    this.apartmentsNearby = {
      coordinates,
      apartments,
    };
  };
  @action cleanApartmentsNearby = () => {
    this.apartmentsNearby = undefined;
  };

  @action openApartmentList = () => {
    this.showApartmentListModal = true;
  };

  @action dismissApartmentList = () => {
    this.showApartmentListModal = false;
  };

  @action setNotice = (msg: string | null) => {
    this.noticeMessage = msg;
  };
}
export { FeedStore };
