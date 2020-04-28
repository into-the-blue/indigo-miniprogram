import { IPresenter, IViewModel } from '../types';
import { ProfileInteractor } from '../interactor';
import Taro from '@tarojs/taro';

class ProfilePresenter implements IPresenter {
  constructor(public interactor: ProfileInteractor, public viewModel: IViewModel) {}

  async componentDidMount() {
    Taro.hideHomeButton();
    this.queryUserSubscriptions();
  }
  componentWillUnmount() {}

  onGetUserInfo = async ({ detail: { userInfo, encryptedData, iv } }) => {
    this.interactor.login(encryptedData, iv);
  };

  queryUserSubscriptions = () => {
    this.interactor.queryUserSubscriptions();
  };

  onPressSubscription = () => {};

  onDeleteSubscription = async (subscriptionId: string) => {
    this.interactor.deleteSubscription(subscriptionId);
  };
}
export { ProfilePresenter };
