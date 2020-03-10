import Taro from '@tarojs/taro';
import { IPresenter, IViewModel } from '../types';
import { FeedInteractor } from '../interactor';

class FeedPresenter implements IPresenter {
  // viewModel: IViewModel;
  constructor(public interactor: FeedInteractor, public viewModel: IViewModel) {}
  // setViewModal = (viewModel: IViewModel) => {
  //   this.viewModel = viewModel;
  // };

  componentDidMount() {
    Taro.hideHomeButton();
    this.interactor.getUserCurrentLocation();
  }
  componentWillUnmount() {}

  onRegionChange = (prop: any) => {
    console.warn('onRegionChange: ', prop);
  };
}
export { FeedPresenter };
