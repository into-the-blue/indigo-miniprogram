import { ProfilePresenter } from '../presenter';
import { UserStore, SubscriptionStore, GlobalStore } from '@/stores';
import { XenoComponentProps } from '@/xeno';
import { XAllEvents } from '@/utils/xeno';

export interface IProps {}
export interface IState {}
export interface IViewModel {
  presenter: IPresenter;
  getProps: IViewModelProps;
}
export interface IPresenter {
  viewModel: IViewModel;
  interactor: IInteractor;
}
export interface IInteractor {}

export interface IViewModelProps extends XenoComponentProps<XAllEvents> {
  buildPresenter: (viewModel: IViewModel) => ProfilePresenter;
  userStore?: UserStore;
  global?: GlobalStore;
  subscriptionStore?: SubscriptionStore;
}
