import Taro from '@tarojs/taro';
import { IInteractor } from '../types';
import { FeedStore } from '../stores';
import { MapStore, UserStore, GlobalStore } from '@/stores';
import { ApartmentClient } from '@/services/apartment';
import { Subscription, from } from 'rxjs';
import get from 'lodash.get';
import { findItemByKeyValue } from '@/utils';
import { LocationClient } from '@/services/location';
import { IPOI, IAvailableCity } from '@/types';
import { MembershipService } from '@/services/membership';
import { filter } from 'rxjs/operators';

class FeedInteractor implements IInteractor {
  $queryStationsSub?: Subscription;
  $queryCurrentCitySub?: Subscription;
  $queryApartmentsNearbySub?: Subscription;
  cleanNoticeTimer?: NodeJS.Timeout;
  constructor(
    public feed: FeedStore,
    public mMap: MapStore,
    public userStore: UserStore,
    public global: GlobalStore,
  ) {}

  queryUserInfo = async (onSuccess?: () => void) => {
    try {
      await this.userStore.initUserInfo();
      onSuccess && onSuccess();
    } catch (err) {
      console.warn('queryUserInfo', err.message, err.response);
      if (err.response.status === 401) {
        Taro.atMessage({
          message: '你还没有登录呢,快去登录吧~',
          duration: 5000,
        });
      }
      //
    }
  };

  setCustomLocationMarker = (locationId: string) => {
    this.mMap.setCustomLocationMarker(locationId);
  };

  openWxSetting = async (scope: string) => {
    const res = await Taro.getSetting();
    if (!res.authSetting[scope]) {
      const res2 = await Taro.openSetting();
      if (res2.authSetting[scope]) {
        this.getUserCurrentLocation();
      } else {
        Taro.atMessage({
          type: 'error',
          message: 'User denied access to location',
        });
      }
    }
  };

  getUserCurrentLocation = async () => {
    console.warn('[getUserCurrentLocation]');
    try {
      const res = await Taro.getLocation({
        type: 'gcj02',
      });
      this.mMap.setState({
        initialCoordinate: {
          lng: res.longitude,
          lat: res.latitude,
        },
      });
      this.mMap.setUserCurrentPositionMarker(res.longitude, res.latitude);
      this.checkAvailableCitys([res.longitude, res.latitude]);
      this.feed.setLocationAuthorized(true);
    } catch (err) {
      console.warn('[getUserCurrentLocation]', err);
      this.feed.setLocationAuthorized(false);
      Taro.atMessage({
        type: 'error',
        message: 'User denied access to location',
      });
    }
  };

  showNotice = (msg: string) => {
    this.feed.setNotice(msg);
    this.cleanNotice();
    this.cleanNoticeTimer = setTimeout(this.dismissNotice, 30 * 1000);
  };

  cleanNotice = () => {
    this.cleanNoticeTimer && clearTimeout(this.cleanNoticeTimer);
  };

  dismissNotice = () => {
    this.feed.setNotice(null);
  };

  cancelQueryUserCurrentCity = () => {
    this.$queryCurrentCitySub && this.$queryCurrentCitySub.unsubscribe();
  };
  $queryAndSetUserCurrentCity = (lng: number, lat: number) => {
    if (!this.userStore.isLoggedIn) return;
    this.cancelQueryUserCurrentCity();
    this.$queryCurrentCitySub = from(this.queryAndSetUserCurrentCity([lng, lat]))
      .pipe(filter((_) => !!_))
      .subscribe({
        next: (city) => this.mMap.setCurrentCity(city!),
      });
  };

  queryAndSetUserCurrentCity = async (coordinates: [number, number]) => {
    try {
      const decoded = await LocationClient.decodeCoordinates(coordinates);
      if (decoded) {
        const city = decoded.regeocode.addressComponent.city;
        this.mMap.setCurrentCity(city);
        return city;
      }
      return null;
    } catch (err) {
      console.warn('[queryAndSetUserCurrentCity]', err.message);
      return null;
    }
  };

  checkAvailableCitys = async (coordinates: [number, number]) => {
    try {
      if (!this.userStore.isLoggedIn) return;
      const city = await this.queryAndSetUserCurrentCity(coordinates);
      const availableCitys = await LocationClient.getAvailableCities();
      this.mMap.setAvailableCities(availableCitys);
      this.showNotice(
        '24小时内新增: ' + availableCitys.map((o) => `${o.name}新增: ${o.count}套`).join(', '),
      );
      if (city) {
        this.mMap.setCurrentCity(city);
        if (!this.mMap.inAvailableCities(city)) {
          const pages = Taro.getCurrentPages();
          console.warn('[checkAvailableCitys]', pages[pages.length - 1].route);
          if (!this.global.isRouteFocused('feed')) return;
          Taro.showModal({
            title: '当前位置不在服务区',
            content: '选择一个提供服务的城市?',
            confirmText: '好的',
            cancelText: '算了',
            success: (res) => {
              if (res.confirm) {
                this.showCityActionSheet();
              }
            },
          });
        }
      }
    } catch (err) {
      //
    }
  };

  setCurrentCity = (city: IAvailableCity) => {
    this.mMap.dismissCityActionSheet();
    if (city.name === this.mMap.currentCity) {
      Taro.atMessage({
        type: 'info',
        message: '你已处于 ' + city.name,
      });
      return;
    }
    this.mMap.setCurrentCity(city.name);
    this.setCurrentCoordinate(...city.defaultCoordinates);
    this.queryStationsNearby(...city.defaultCoordinates);
  };
  showCityActionSheet = () => {
    this.mMap.showCityActionSheet();
  };

  cleanAptsNearby = () => {
    this.feed.cleanApartmentsNearby();
  };
  /**
   *
   *
   * @memberof FeedInteractor
   * unsubscribe
   */
  cancelQueryApartmentsNearby = () => {
    this.$queryApartmentsNearbySub && this.$queryApartmentsNearbySub.unsubscribe();
    this.$queryApartmentsNearbySub = undefined;
  };

  /**
   *
   *
   * @memberof FeedInteractor
   * add apartments markers
   */
  showApartmentsNearby = () => {
    if (!this.feed.apartmentsNearby) return;
    // this.setCurrentCoordinate(...this.feed.apartmentsNearby!.coordinates);
    this.mMap.setApartmentMarkers(this.feed.apartmentsNearby!.apartments!);
  };
  /**
   *
   *
   * @memberof FeedInteractor
   * query apartments nearby coordiantes, for members only
   *
   * @param showImmediately if its true, use `isQueryingAptsNearby` to make sure invoke one query each time
   */
  queryApartmentsNearbyLocation = (coordinates?: [number, number], showImmediately?: boolean) => {
    const _coordinates = coordinates || this.mMap.currentCoordinate;
    if (!_coordinates) return;
    if (showImmediately && this.feed.isQueryingAptsNearby) return;
    this.cancelQueryApartmentsNearby();
    if (showImmediately) this.feed.toggleIsQueryingAptsNearby();
    this.$queryApartmentsNearbySub = from(
      ApartmentClient.queryApartmentsNearbyCoordinates(_coordinates, 500, 50),
    ).subscribe({
      next: (apartments) => {
        if (!apartments.length) {
          if (showImmediately)
            Taro.atMessage({
              message: '这么偏僻的地点... 恐怕找不到房子呢',
            });
          return;
        }
        console.warn('[queryApartmentsNearbyLocation]', apartments.length);
        if (showImmediately) {
          Taro.atMessage({
            message: `附近 500 米内, 找到${apartments.length}条信息`,
          });
          this.mMap.setApartmentMarkers(apartments);
          return;
        }
        this.feed.setApartmentsNearby(_coordinates, apartments);
      },
      error: (err) => {
        console.warn('[queryApartmentsNearbyLocation]', err);
      },
      complete: () => {
        if (showImmediately) this.feed.toggleIsQueryingAptsNearby();
      },
    });
  };
  /**
   *
   *
   * @memberof FeedInteractor
   * query metro stations nearby coordiantes
   */
  queryStationsNearby = (lng?: number, lat?: number) => {
    this.cancelQueryStations();
    if (!this.mMap.currentCoordinate && !(lng && lat)) return;
    const coordinates: [number, number] = lng && lat ? [lng, lat] : this.mMap.currentCoordinate!;
    const args: [number, number, number] = [...coordinates, 1000] as any;
    this.$queryStationsSub = from(ApartmentClient.queryStationsNearby(...args)).subscribe({
      next: (stationsNearby) => {
        this.cleanAptsNearby();
        if (stationsNearby.length === 0) {
          // query apartments nearby coordinates, member only
          this.queryApartmentsNearbyLocation(coordinates);
        }
        this.mMap.setMetroStationMarkers(stationsNearby);
      },
      error: (err) => {
        console.warn(err.message);
      },
    });
  };

  /**
   *
   *
   * @memberof FeedInteractor
   * query user's membership info
   */
  queryLatestMemberInfo = async () => {
    console.warn('[queryLatestMemberInfo]', 'query');
    try {
      const info = await MembershipService.getMemberInfo();
      if (!info) return;
      console.warn('[queryLatestMemberInfo]', info);
      this.userStore.setState({
        memberInfo: info,
      });
    } catch (err) {
      console.warn('[queryLatestMemberInfo]', err);
    }
  };

  /**
   *
   *
   * @memberof FeedInteractor
   * get or create custom location
   */
  queryCustomLocationPOI = async (poi: IPOI) => {
    try {
      const customLocation = await LocationClient.getCustomLocationFromPOI(poi);
      this.mMap.addCustomLocations(customLocation);
      console.warn('[queryCustomLocation]', customLocation);
      return customLocation.id;
    } catch (err) {
      console.warn('[queryCustomLocation]', err.message);
    }
  };

  cancelQueryStations = () => this.$queryStationsSub && this.$queryStationsSub.unsubscribe();

  setCurrentCoordinate = (lng: number, lat: number) => {
    this.mMap.setCurrentCoordinates(lng, lat);
  };

  onDragMap = () => {
    if (!this.mMap.mapDragged) {
      this.mMap.setState({
        mapDragged: true,
      });
    }
  };

  /**
   *
   *
   * @memberof FeedInteractor
   */
  focusCustomLocation = async (locationId: string) => {
    const customLocation = findItemByKeyValue(this.mMap.customLocations, locationId, 'id');
    if (!customLocation) return;
    Taro.setNavigationBarTitle({
      title: customLocation.name,
    });
    if (
      this.mMap.isLocationFocused('customLocation', customLocation.id, {
        ...customLocation,
      })
    )
      return;
    Taro.showLoading({
      mask: true,
      title: 'Loading ...',
    });
    try {
      const apartments = await ApartmentClient.queryApartmentsNearbyCoordinates(
        customLocation.coordinates,
        500,
        50,
      );
      this.mMap.setApartmentMarkers(apartments);
    } catch (err) {
      console.warn(err.message);
      this.mMap.focusedLocation = undefined;
      Taro.atMessage({
        message: '出错啦...',
        type: 'error',
      });
    } finally {
      Taro.hideLoading();
    }
  };

  /**
   *
   *
   * @memberof FeedInteractor
   * when user press metro station
   * check if it's focused already, if not set it as current focused position
   *
   */
  focusMetroStation = async (stationId: string) => {
    if (this.mMap.isLocationFocused('metroStation', stationId)) return;
    const station = this.mMap.getMetroStationById(stationId);
    station &&
      Taro.setNavigationBarTitle({
        title: station!.stationName,
      });
    Taro.showLoading({
      mask: true,
      title: 'Loading ...',
    });
    try {
      const apartments = await ApartmentClient.queryApartmentsNearbyMetroStation(
        stationId,
        500,
        50,
      );
      if (!apartments.length) {
        return Taro.atMessage({
          message: '没有找到房源... 正在努力寻找中',
          duration: 4000,
        });
      }
      Taro.atMessage({
        message: `附近 500 米内, 找到${apartments.length}套房源`,
      });

      this.mMap.setApartmentMarkers(apartments);
    } catch (err) {
      console.warn(err.message);
      this.mMap.focusedLocation = undefined;
      Taro.atMessage({
        message: '出错啦...',
        type: 'error',
      });
    } finally {
      Taro.hideLoading();
    }
  };

  /**
   *
   *
   * @memberof FeedInteractor
   * show detail modal
   */
  getApartmentInfoData = (houseId: string | undefined) => {
    const apartment = houseId
      ? this.mMap.currentApartments.find((o) => o.houseId === houseId)
      : undefined;

    return {
      apartment,
      apartments: this.mMap.currentApartments,
    };
  };

  /**
   *
   *
   * @memberof FeedInteractor
   */
  toggleApartmentList = () => {
    if (this.feed.showApartmentListModal) return this.feed.dismissApartmentList();
    this.feed.openApartmentList();
  };

  getEditSubscriptionTarget = () => {
    const type = get(this.mMap.focusedLocation, 'type');
    if (type === 'metroStation') {
      const station = findItemByKeyValue(
        this.mMap.currentMetroStations,
        this.mMap.focusedMetroStation.payload.stationId,
        'stationId',
      )!;
      return {
        payload: station,
        type,
      };
    }
    if (type === 'customLocation') {
      const customLocation = this.mMap.getCustomLocationById(
        this.mMap.focusedCustomLocation.payload.id,
      )!;
      return {
        type,
        payload: customLocation,
      };
    }
  };

  isLoggedIn = () => {
    if (!this.userStore.isLoggedIn) {
      Taro.atMessage({
        type: 'info',
        message: '请先登录!',
      });
      return false;
    }
    return true;
  };

  isValidMember = (msg?: string, msg2?: string) => {
    if (!this.userStore.isMember) {
      Taro.atMessage({
        message: msg || '你还不是会员, 快去领取免费会员吧',
        type: 'warning',
      });
      return false;
    }
    if (this.userStore.isMembershipExpired) {
      Taro.atMessage({
        message: msg2 || '你的会员已过期',
        type: 'warning',
      });
      return false;
    }
    return true;
  };
}

export { FeedInteractor };
