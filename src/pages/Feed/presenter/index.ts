import Taro from '@tarojs/taro';
import { IPresenter, IViewModel } from '../types';
import { FeedInteractor } from '../interactor';
import { XExtractData, IPOI, IAvailableCity } from '@/types';
import { Routes } from '@/utils/constants';
import { XFeedSetMapFocusedPosition } from '../eventStation';

class FeedPresenter implements IPresenter {
  beginTimeStamp: number = Date.now();

  constructor(public interactor: FeedInteractor, public viewModel: IViewModel) {}

  componentDidMount() {
    Taro.hideHomeButton();
    this.init();
    this.viewModel.getProps.on('Feed_setMapFocusedPosition', this.setFocusedPosition);
    this.viewModel.getProps.on('Feed_queryMemberInfo', this.interactor.queryLatestMemberInfo);
  }
  componentWillUnmount() {}

  init = async () => {
    this.interactor.queryLastestUserInfo();
    await this.interactor.getUserCurrentLocation();
    this.interactor.queryStationsNearby();
  };

  requestLocationPermission = async () => {
    this.interactor.openWxSetting('scope.userLocation');
  };

  setFocusedPosition = async (data: XExtractData<XFeedSetMapFocusedPosition>) => {
    const { type } = data;
    console.warn('[setFocusedPosition]', data);
    if (type === 'metroStation') {
      // ...
    }
    if (type === 'customLocation') {
      // ...
      const locationId = await this.interactor.queryCustomLocationPOI(data.payload as IPOI);
      if (!locationId) return;
      this.interactor.setCustomLocationMarker(locationId);
      this.interactor.setCurrentCoordinate(...data.payload.coordinates);
      this.interactor.focusCustomLocation(locationId);
      const mapCtx = Taro.createMapContext('map');
      setTimeout(mapCtx.moveToLocation, 0);
    }
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
        this.interactor.focusMetroStation(id);
        break;
      case 'apartment':
        this.onPressApartment(id);
        break;
      case 'customLocation':
        this.interactor.focusCustomLocation(id);
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
      url: Routes.ApartmentInfo,
    });
  };

  onSelectCity = (city: IAvailableCity) => {
    this.interactor.onDragMap();
    this.interactor.setCurrentCity(city);
    // const mapCtx = Taro.createMapContext('map');
    // setTimeout(mapCtx.moveToLocation, 0);
  };

  /**
   * causedBy: update: (map init, pinch ) | "gesture" (drag) |
   *
   * @memberof FeedPresenter
   */
  onBeginDrag = (e: any) => {
    if (e.causedBy !== 'gesture') return;
    // console.warn('on begin', e);
    this.interactor.onDragMap();
    this.beginTimeStamp = e.timeStamp;
    this.interactor.cancelQueryStations();
    this.interactor.cancelQueryUserCurrentCity();
  };

  /**
   * causedBy: scale (map init, pinch) | "drag"
   *
   * @memberof FeedPresenter
   */
  onEndDrag = async (e: any) => {
    if (e.causedBy !== 'drag') return;
    // console.warn('on end', e.timeStamp - this.beginTimeStamp, e);
    const mapCtx = Taro.createMapContext('map');
    const { longitude, latitude } = await mapCtx.getCenterLocation({});
    this.interactor.setCurrentCoordinate(longitude, latitude);
    this.interactor.queryStationsNearby(longitude, latitude);
    this.interactor.$queryAndSetUserCurrentCity(longitude, latitude);
  };

  showApartmentList = () => {
    this.interactor.toggleApartmentList();
  };

  goToSubscription = () => {
    const target = this.interactor.getEditSubscriptionTarget()!;
    this.viewModel.getProps.next('EditSubscription_init', {
      guaranteed: true,
      data: {
        target,
      },
    });
    Taro.navigateTo({
      url: Routes.EditSubscription,
    });
  };
}
export { FeedPresenter };
