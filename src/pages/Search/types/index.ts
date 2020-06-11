import { SearchPresenter } from '../presenter';
import { XenoComponentProps } from '@/xeno';
import { XAllEvents } from '@/utils/xeno';
import { SearchStore } from '../stores';

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
  buildPresenter: (viewModel: IViewModel) => SearchPresenter;
  searchStore: SearchStore;
}
