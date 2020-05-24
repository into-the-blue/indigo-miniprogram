import Taro from '@tarojs/taro';
import { IPresenter, IViewModel } from '../types';
import { FeedInteractor } from '../interactor';
import {} from '@/types';
import queryString from 'query-string';

class FeedPresenter implements IPresenter {
  beginTimeStamp: number = Date.now();

  constructor(public interactor: FeedInteractor, public viewModel: IViewModel) {}

  componentDidMount() {
    console.warn('did mount');
    Taro.hideHomeButton();
    this.init();
  }
  componentWillUnmount() {
    console.warn('unmount');
  }

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
        this.onPressApartment(id);
        break;
    }
  };

  onPressApartment = (houseId: string) => {
    const data = this.interactor.getApartmentInfoData(houseId);
    if (!data) return;
    this.viewModel.getProps.next('ApartmentInfo_init', {
      guaranteed: true,
      data: {
        ...data,
      },
    });
    Taro.navigateTo({
      url: '../../ApartmentInfo/builder/index',
    });
  };

  /**
   * causedBy: update: (map init, pinch ) | "gesture" (drag) |
   *
   * @memberof FeedPresenter
   */
  onBeginDrag = (e: any) => {
    if (e.causedBy !== 'gesture') return;
    console.warn('on begin', e);
    this.interactor.onDragMap();
    this.beginTimeStamp = e.timeStamp;
  };

  /**
   * causedBy: scale (map init, pinch) | "drag"
   *
   * @memberof FeedPresenter
   */
  onEndDrag = async (e: any) => {
    if (e.causedBy !== 'drag') return;
    console.warn('on end', e.timeStamp - this.beginTimeStamp, e);
    this.interactor.cancelQueryStations();
    const mapCtx = Taro.createMapContext('map');
    const { longitude, latitude } = await mapCtx.getCenterLocation({});
    this.interactor.setCurrentCoordinate(longitude, latitude);
    this.interactor.queryStationsNearby(longitude, latitude);
  };

  showApartmentList = () => {
    this.interactor.toggleApartmentList();
  };

  goToSubscription = () => {
    Taro.navigateTo({
      url:
        '../../EditSubscription/builder/index?' +
        queryString.stringify({
          type: 'metroStation',
          id: this.interactor.mMap.focusedMetroStation.stationId,
        }),
    });
  };
}
export { FeedPresenter };
