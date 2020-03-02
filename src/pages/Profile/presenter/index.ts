import { IPresenter, IInteractor, IViewModel } from '../types';

class ProfilePresenter implements IPresenter {
  
  constructor(public interactor: IInteractor, public viewModel: IViewModel) {}

  componentDidMount() {}
  componentWillUnmount() {}
}
export { ProfilePresenter };
