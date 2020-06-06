import { IPresenter, IViewModel } from '../types';
import { FreeMembershipInteractor } from '../interactor';

class FreeMembershipPresenter implements IPresenter {
  constructor(public interactor: FreeMembershipInteractor, public viewModel: IViewModel) {}

  componentDidMount() {}
  componentWillUnmount() {}
}
export { FreeMembershipPresenter };
