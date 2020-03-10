import { IPresenter, IInteractor, IViewModel } from '../types';
import Taro from '@tarojs/taro';

class ProfilePresenter implements IPresenter {
  constructor(public interactor: IInteractor, public viewModel: IViewModel) {}

  componentDidMount() {
    Taro.hideHomeButton();
  }
  componentWillUnmount() {}
}
export { ProfilePresenter };
