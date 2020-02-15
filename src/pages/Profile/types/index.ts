export interface IProps {}
export interface IState {}
export interface IViewModel {
  presenter: IPresenter;
}
export interface IPresenter {
  viewModel?: IViewModel;
  setViewModal: (viewModel: IViewModel) => void;
  interactor: IInteractor;
}
export interface IInteractor {}
