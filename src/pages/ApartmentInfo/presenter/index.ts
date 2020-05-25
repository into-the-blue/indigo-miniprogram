import { IPresenter, IViewModel } from '../types';
import { ApartmentInfoInteractor } from '../interactor';
import { XApartmentInfoInit } from '../eventStation';
import { XExtractData } from '@/types';

class ApartmentInfoPresenter implements IPresenter {
  constructor(public interactor: ApartmentInfoInteractor, public viewModel: IViewModel) {}

  componentDidMount() {
    this.viewModel.getProps.on('ApartmentInfo_init', this.getInitialProps);
  }
  componentWillUnmount() {}

  getInitialProps = (data: XExtractData<XApartmentInfoInit>) => {
    const { apartment, apartments } = data;
    console.warn('getInitialProps', data);
    this.interactor.setInitialData(apartment, apartments);
  };
}
export { ApartmentInfoPresenter };
