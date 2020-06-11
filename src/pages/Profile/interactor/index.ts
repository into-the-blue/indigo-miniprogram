import { IInteractor } from '../types';
import { UserStore, SubscriptionStore } from '@/stores';
import { Cache } from '@/utils';
import Taro from '@tarojs/taro';
import { SubscriptionClient } from '@/services/subscription';
import { ISubscriptionClient } from '@/types';
import { WX_TEMPLATE_ID } from '@/utils/constants';

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

  getEditSubscriptionTarget = (subscription: ISubscriptionClient) => {
    return {
      type: subscription.type,
      payload: {
        coordinates: subscription.coordinates,
        ...subscription.payload,
      },
    };
  };

  requestAccessToSubscribeMessage = () => {
    if (!this.userStore.isLoggedIn) return;
    if (this.userStore.messageGranted) return;
    Taro.requestSubscribeMessage({
      tmplIds: [WX_TEMPLATE_ID],
      success: data => {
        const state = data[WX_TEMPLATE_ID];
        if (state === 'accept') {
          //
          Taro.atMessage({
            type: 'success',
            message: '耐心等待房源通知吧~',
          });
          this.userStore.grantMessage();
        }
        if (state === 'reject') {
          //
          Taro.atMessage({
            type: 'error',
            message: '不开启通知, 将错过合适房源~',
            duration: 5000,
          });
        }

        if (state === 'ban') {
          //
          Taro.atMessage({
            type: 'error',
            message: '不开启通知, 将错过合适房源~',
            duration: 5000,
          });
        }
      },
      fail: data => {
        console.warn(data);
      },
    });
  };

  isValidMember = () => {
    if (!this.userStore.isMember) {
      Taro.atMessage({
        message: '你还不是会员, 快去领取免费会员吧',
        type: 'warning',
      });
      return false;
    }
    if (this.userStore.isMembershipExpired) {
      Taro.atMessage({
        message: '你的会员已过期',
        type: 'warning',
      });
      return false;
    }
    return true;
  };
}

export { ProfileInteractor };
