import { IPresenter, IViewModel } from '../types';
import { EditSubscriptionInteractor } from '../interactor';

class EditSubscriptionPresenter implements IPresenter {
  constructor(public interactor: EditSubscriptionInteractor, public viewModel: IViewModel) {}

  componentDidMount() {}
  componentWillUnmount() {}

  onPressSave = () => {
    this.interactor.onSave();
  };
}
export { EditSubscriptionPresenter };
