import { IPresenter, IInteractor, IViewModel } from '../types';

class ProfilePresenter implements IPresenter {
  viewModel: IViewModel;
  constructor(public interactor: IInteractor) {}
  setViewModal = (viewModel: IViewModel) => {
    this.viewModel = viewModel;
  };

  componentDidMount() {}
  componentWillUnmount() {}
}
export { ProfilePresenter };
