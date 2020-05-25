import { IInteractor } from '../types';
import { ApartmentInfoStore } from '../stores';
import { IApartment } from '@/types';

class ApartmentInfoInteractor implements IInteractor {
  constructor(private apartmentInfoStore: ApartmentInfoStore) {}

  setInitialData = (apartment: IApartment, apartments?: IApartment[]) => {
    this.apartmentInfoStore.setState({
      apartments: apartments || [],
      apartment,
    });
  };
}

export { ApartmentInfoInteractor };
