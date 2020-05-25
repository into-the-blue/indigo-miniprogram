import { XenoComponentProps } from '@/xeno';
import { ApartmentInfoPresenter } from '../presenter';
import { XAllEvents } from '@/utils/xeno';
import { ApartmentInfoStore } from '../stores';

export interface IProps {}
export interface IState {}
export interface IViewModel {
  presenter: IPresenter;
  getProps: IViewModalProps;
}
export interface IPresenter {
  viewModel: IViewModel;
  interactor: IInteractor;
}
export interface IInteractor {}

export interface IViewModalProps extends XenoComponentProps<XAllEvents> {
  buildPresenter: (viewModel: IViewModel) => ApartmentInfoPresenter;
  apartmentInfoStore?: ApartmentInfoStore;
}
