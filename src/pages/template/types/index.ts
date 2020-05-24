import { TemplatePresenter } from '../presenter';

export interface IProps {}
export interface IState {}
export interface IViewModel {
  presenter: IPresenter;
}
export interface IPresenter {
  viewModel: IViewModel;
  interactor: IInteractor;
}
export interface IInteractor {}

export interface IViewModelProps {
  buildPresenter: (viewModel: IViewModel) => TemplatePresenter;
}
