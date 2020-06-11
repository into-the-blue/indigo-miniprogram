import { IInteractor } from '../types';
import { ApartmentInfoStore } from '../stores';
import { IApartment } from '@/types';

class ApartmentInfoInteractor implements IInteractor {
  constructor(private apartmentInfoStore: ApartmentInfoStore) {}

  setInitialData = (apartment?: IApartment, apartments?: IApartment[]) => {
    this.apartmentInfoStore.setState({
      apartments: apartments || [],
      initialApartment: apartment,
      selectedApartment: apartment,
    });
  };

  onPressApartment = (apartment: IApartment) => {
    if (
      this.apartmentInfoStore.selectedApartment &&
      apartment.houseId === this.apartmentInfoStore.selectedApartment!.houseId
    ) {
      return this.apartmentInfoStore.setState({
        selectedApartment: this.apartmentInfoStore.initialApartment!,
      });
    }
    this.apartmentInfoStore.setState({
      selectedApartment: apartment,
    });
  };
}

export { ApartmentInfoInteractor };
