import Taro from '@tarojs/taro';
import { IInteractor } from '../types';
import { FeedStore } from '../stores';
import { MapStore, UserStore } from '@/store';
import { ApartmentClient } from '@/services/apartment';
import { Subscription, from } from 'rxjs';
import {} from 'lodash';

class FeedInteractor implements IInteractor {
  $queryStationsSub?: Subscription;

  constructor(public feed: FeedStore, public mMap: MapStore, public userStore: UserStore) {}

  queryLastestUserInfo = async () => {
    try {
      await this.userStore.initUserInfo();
    } catch (err) {
      console.warn('queryLastestUserInfo', err);
      //
    }
  };

  getUserCurrentLocation = async () => {
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
      this.mMap.setUserCurrentPosition(121.44045, 31.22524);
      // console.warn(res);
      // this.mMap.setState({
      //   currentCoordinate: {
      //     lat: res.latitude,
      //     lng: res.longitude,
      //   },
      // });
    } catch (err) {
      console.warn(err);
    }
  };
  queryStationsNearby = async (lng?: number, lat?: number) => {
    if (!this.mMap.currentCoordinate) return;
    const args: [number, number, number] = [
      this.mMap.currentCoordinate!.lng,
      this.mMap.currentCoordinate!.lat,
      1000,
    ];
    if (lng && lat) {
      args[0] = lng;
      args[1] = lat;
    }
    this.$queryStationsSub = from(ApartmentClient.queryStationsNearby(...args)).subscribe({
      next: (stationsNearby) => this.mMap.setMetroStations(stationsNearby),
      error: (err) => {
        console.warn(err.message);
      },
    });
  };

  cancelQueryStations = () => this.$queryStationsSub && this.$queryStationsSub.unsubscribe();

  setCurrentCoordinate = (lng: number, lat: number) => {
    this.mMap.setState({
      currentCoordinate: {
        lng,
        lat,
      },
    });
  };

  onDragMap = () => {
    if (!this.mMap.mapDragged) {
      this.mMap.setState({
        mapDragged: true,
      });
    }
  };

  onPressMetroStation = async (stationId: string) => {
    // const station = this.mMap.currentMetroStations.find(o => o.stationId === stationId)!;
    if (this.mMap.isStationFocused(stationId)) return;

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
      this.mMap.setApartments(apartments);
    } catch (err) {
      console.warn(err.message);
      this.mMap.focusedPosition = undefined;
      Taro.showToast({
        title: '出错啦...',
        icon: 'none',
        duration: 2000,
      });
    } finally {
      Taro.hideLoading();
    }
  };

  onPressApartment = (houseId: string) => {
    const apartment = this.mMap.currentApartments.find((o) => o.houseId === houseId);
    console.warn(apartment);
    if (!apartment) return;
    this.feed.showApartmentDetail(apartment);
  };
}

export { FeedInteractor };
