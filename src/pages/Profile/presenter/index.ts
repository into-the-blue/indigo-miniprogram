import { IPresenter, IViewModel } from '../types';
import { ProfileInteractor } from '../interactor';
import Taro from '@tarojs/taro';

class ProfilePresenter implements IPresenter {
  constructor(public interactor: ProfileInteractor, public viewModel: IViewModel) {}

  async componentDidMount() {
    Taro.hideHomeButton();
  }
  componentWillUnmount() {}

  onGetUserInfo = async ({ detail: { userInfo, encryptedData, iv } }) => {
    this.interactor.login(encryptedData, iv);
  };
}
export { ProfilePresenter };
