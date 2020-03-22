import Taro from '@tarojs/taro';
import { IPresenter, IViewModel } from '../types';
import { FeedInteractor } from '../interactor';
import { IMetroStationClient } from '@/types';

class FeedPresenter implements IPresenter {
  constructor(public interactor: FeedInteractor, public viewModel: IViewModel) {}

  componentDidMount() {
    Taro.hideHomeButton();
    this.init();
  }
  componentWillUnmount() {}

  init = async () => {
    this.interactor.queryLastestUserInfo();
    await this.interactor.getUserCurrentLocation();
    this.interactor.queryStationsNearby();
  };

  onRegionChange = (prop: any) => {
    console.warn('onRegionChange: ', prop);
  };

  onPressMarker = (evt: any) => {
    const { markerId } = evt;
    const type = markerId.split(' ')[0];
    const id = markerId.split(' ')[1];
    switch (type) {
      case 'user':
        break;
      case 'station':
        this.interactor.onPressMetroStation(id);
        break;
      case 'apartment':
        this.interactor.onPressApartment(id);
        break;
    }
  };
}
export { FeedPresenter };
