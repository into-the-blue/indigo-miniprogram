import { IPresenter, IInteractor, IViewModel } from '../types';

class EditSubscriptionPresenter implements IPresenter {
  
  constructor(public interactor: IInteractor, public viewModel: IViewModel) {}

  componentDidMount() {}
  componentWillUnmount() {}
}
export { EditSubscriptionPresenter };
