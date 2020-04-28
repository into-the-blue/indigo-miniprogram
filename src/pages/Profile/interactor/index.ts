import { IInteractor } from '../types';
import { UserStore, SubscriptionStore } from '@/store';
import { Cache } from '@/utils';
import Taro from '@tarojs/taro';
import { SubscriptionClient } from '@/services/subscription';

class ProfileInteractor implements IInteractor {
  constructor(public userStore: UserStore, public subscriptionStore: SubscriptionStore) {}

  login = async (encryptedData: string, iv: string) => {
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
    } catch (err) {
      Taro.showToast({
        title: '出错啦...',
        icon: 'none',
      });
    }
  };

  queryUserSubscriptions = async () => {
    const subscriptions = await SubscriptionClient.queryUserSubscriptions();
    console.warn(subscriptions);
    this.subscriptionStore.setUserSubscriptions(subscriptions);
  };

  deleteSubscription = async (subscriptionId: string) => {
    try {
      Taro.showLoading();
      await SubscriptionClient.deleteSubscription(subscriptionId);
      this.subscriptionStore.removeSubscriptionById(subscriptionId);
      Taro.showToast({
        title: '成了',
        icon: 'success',
        duration: 2000,
      });
    } catch (err) {
      Taro.showToast({
        title: '出错啦...',
        icon: 'none',
      });
    } finally {
      Taro.hideLoading();
    }
  };
}

export { ProfileInteractor };
