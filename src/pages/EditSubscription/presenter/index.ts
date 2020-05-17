import { IPresenter, IViewModel } from '../types';
import { EditSubscriptionInteractor } from '../interactor';
import Taro from '@tarojs/taro';

class EditSubscriptionPresenter implements IPresenter {
  constructor(public interactor: EditSubscriptionInteractor, public viewModel: IViewModel) {}

  componentDidMount() {
    const { type, id } = Taro.Current.router!.params;
    if (!type || !id) return Taro.navigateBack();
    this.init();
  }
  componentWillUnmount() {}

  init = () => {
    this.setTarget();
    this.checkIfHaveExistingSub();
  };
  setTarget = () => {
    const { type, id } = Taro.Current.router!.params;
    this.interactor.setTarget(type as any, id);
  };
  checkIfHaveExistingSub = () => {
    this.interactor.getExistingSubFromLocal();
  };
  onPressSave = () => {
    this.interactor.onSave();
  };
}
export { EditSubscriptionPresenter };
