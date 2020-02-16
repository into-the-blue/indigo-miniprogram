import Taro from '@tarojs/taro';
import { IPresenter, IViewModel } from '../types';
import { FeedInteractor } from '../interactor';

class FeedPresenter implements IPresenter {
  viewModel: IViewModel;
  constructor(public interactor: FeedInteractor) {}
  setViewModal = (viewModel: IViewModel) => {
    this.viewModel = viewModel;
  };

  componentDidMount() {
    // this._getUserCurrentLocation();
  }
  _getUserCurrentLocation = async () => {
    const res = await Taro.getLocation({
      type: 'gcj02',
    });
    console.warn(res);
    this.interactor.feed.setState({
      coordinate: {
        lat: res.latitude,
        lng: res.longitude,
      },
    });
  };
  componentWillUnmount() {}
}
export { FeedPresenter };
