import Taro from '@tarojs/taro';
import { IInteractor } from '../types';
import { FeedStore } from '../stores';
import { MapStore } from '@/store';

class FeedInteractor implements IInteractor {
  constructor(public feed: FeedStore, public mMap: MapStore) {}

  getUserCurrentLocation = async () => {
    try {
      const res = await Taro.getLocation({
        type: 'gcj02',
      });
      // console.warn(res);
      this.mMap.setState({
        currentCoordinate: {
          lat: res.latitude,
          lng: res.longitude,
        },
      });
    } catch (err) {
      console.warn(err);
    }
  };
}

export { FeedInteractor };
