import { FeedStore } from '../stores';
import { GlobalStore, MapStore, UserStore } from '@/stores';
import { FeedPresenter } from '../presenter';
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
  feed: FeedStore;
  global: GlobalStore;
  buildPresenter: (viewModel: IViewModel) => FeedPresenter;
  mMap: MapStore;
  userStore: UserStore;
}
