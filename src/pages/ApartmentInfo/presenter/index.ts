import { IPresenter, IViewModel } from '../types';
import { ApartmentInfoInteractor } from '../interactor';
import { XApartmentInfoInit } from '../eventStation';
import { XExtractData, IApartment } from '@/types';
import Taro from '@tarojs/taro';

class ApartmentInfoPresenter implements IPresenter {
  constructor(public interactor: ApartmentInfoInteractor, public viewModel: IViewModel) {}

  componentDidMount() {
    this.viewModel.getProps.on('ApartmentInfo_init', this.getInitialProps);
  }
  componentWillUnmount() {}

  getInitialProps = (data: XExtractData<XApartmentInfoInit>) => {
    const { apartment, apartments } = data;
    console.warn('getInitialProps', data);
    if (!apartment && !apartments) return Taro.navigateBack();
    this.interactor.setInitialData(apartment, apartments);
  };

  onPressApartment = (apartment: IApartment) => {
    this.interactor.onPressApartment(apartment);
  };
}
export { ApartmentInfoPresenter };
