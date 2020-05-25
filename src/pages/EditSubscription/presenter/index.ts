import { IPresenter, IViewModel } from '../types';
import { EditSubscriptionInteractor } from '../interactor';
import { XEditSubscriptionInit } from '../eventStation';
import Taro from '@tarojs/taro';
import { XExtractData } from '@/types';
import { TEditSubTarget } from '../stores';

class EditSubscriptionPresenter implements IPresenter {
  constructor(public interactor: EditSubscriptionInteractor, public viewModel: IViewModel) {}

  componentDidMount() {
    this.getInitialProps();
  }
  componentWillUnmount() {}

  getInitialProps = () => {
    this.viewModel.getProps.on(
      'EditSubscription_init',
      (data: XExtractData<XEditSubscriptionInit>) => {
        const { target } = data;
        console.warn(target)
        if (!target) return Taro.navigateBack();
        this.setTarget(target);
        this.checkIfHaveExistingSub();
      },
    );
  };
  setTarget = (target: TEditSubTarget) => {
    this.interactor.setTarget(target);
  };
  checkIfHaveExistingSub = () => {
    this.interactor.getExistingSubFromLocal();
  };
  onPressSave = () => {
    this.interactor.onSave();
  };
}
export { EditSubscriptionPresenter };
