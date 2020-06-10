import { IInteractor } from '../types';
import { UserStore, SubscriptionStore } from '@/stores';
import { Cache } from '@/utils';
import Taro from '@tarojs/taro';
import { SubscriptionClient } from '@/services/subscription';
import { ISubscriptionClient } from '@/types';

class ProfileInteractor implements IInteractor {
  constructor(public userStore: UserStore, public subscriptionStore: SubscriptionStore) {}

  login = async (encryptedData: string, iv: string, onSuccess: () => void) => {
    try {
      const { accessToken, refreshToken, isNew, userInfo } = await this.userStore.login(
        encryptedData,
        iv,
      );
      Cache.set('authData', {
        accessToken,
        refreshToken,
      });
      this.userStore.setState({
        userInfo,
      });
      if (isNew) {
        // new user...
      }
      onSuccess();
    } catch (err) {
      Taro.atMessage({
        message: '出错啦...',
        type: 'error',
      });
    }
  };

  queryUserSubscriptions = async () => {
    if (!this.userStore.isLoggedIn) return;
    const subscriptions = await SubscriptionClient.queryUserSubscriptions();
    console.warn(subscriptions);
    this.subscriptionStore.setUserSubscriptions(subscriptions);
  };

  deleteSubscription = async (subscriptionId: string) => {
    try {
      Taro.showLoading();
      const { success, data } = await SubscriptionClient.deleteSubscription(subscriptionId);
      this.subscriptionStore.removeSubscriptionById(subscriptionId);
      console.warn(success, data!.deletedCount);
      Taro.atMessage({
        message: '成了',
        type: 'success',
      });
    } catch (err) {
      console.warn(err.message);
      Taro.atMessage({
        message: '出错啦...',
        type: 'error',
      });
    } finally {
      Taro.hideLoading();
    }
  };

  getEditSubscriptionTarget = (
    type: 'metroStation' | 'customLocation',
    subscription: ISubscriptionClient,
  ) => {
    if (type === 'metroStation') {
      return {
        type,
        payload: {
          coordinates: subscription.coordinates,
          ...subscription.payload,
        },
      };
    }
  };
}

export { ProfileInteractor };
