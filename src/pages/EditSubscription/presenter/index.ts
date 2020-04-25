import { IPresenter, IViewModel } from '../types';
import { EditSubscriptionInteractor } from '../interactor';

class EditSubscriptionPresenter implements IPresenter {
  constructor(public interactor: EditSubscriptionInteractor, public viewModel: IViewModel) {}

  componentDidMount() {
    this.checkIfHaveExistingSub();
  }
  componentWillUnmount() {}

  checkIfHaveExistingSub = () => {
    this.interactor.getExistingSubFromLocal();
  };
  onPressSave = () => {
    this.interactor.onSave();
  };
}
export { EditSubscriptionPresenter };
