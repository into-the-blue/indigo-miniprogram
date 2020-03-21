import Taro from '@tarojs/taro';
import { IPresenter, IViewModel } from '../types';
import { FeedInteractor } from '../interactor';

class FeedPresenter implements IPresenter {
  constructor(public interactor: FeedInteractor, public viewModel: IViewModel) {}

  componentDidMount() {
    Taro.hideHomeButton();
    this.interactor.queryLastestUserInfo();
    this.interactor.getUserCurrentLocation();
  }
  componentWillUnmount() {}

  onRegionChange = (prop: any) => {
    console.warn('onRegionChange: ', prop);
  };
}
export { FeedPresenter };
