import { IInteractor } from '../types';
import { FreeMembershipStore } from '../stores';
import { MembershipService } from '@/services/membership';
import { UserStore } from '@/stores';
import { Routes } from '@/utils/constants';
import Taro from '@tarojs/taro';
import { sleep } from '@/utils';

class FreeMembershipInteractor implements IInteractor {
  constructor(private viewStore: FreeMembershipStore, private userStore: UserStore) {}

  getFreeMembershipInfo = async () => {
    try {
      this.viewStore.onInitStart();
      const info = await MembershipService.getFreeMembershipInfo();
      this.viewStore.setState({
        remainingRedeemTimes: info.remainingRedeemTimes,
        enable: info.enable,
      });
    } catch (err) {
      console.warn('[getFreeMembershipInfo]', err);
      this.viewStore.onInitError();
    } finally {
      this.viewStore.hideLoading();
    }
  };

  redeemFreeMembership = async (onSuccess?: () => void) => {
    // if not logged in, guide users to log in
    if (!this.userStore.isLoggedIn) {
      console.warn('aaaa');
      Taro.showModal({
        title: '请先登录',
        content: '前往登录?',
        success: res => {
          if (res.confirm) {
            Taro.switchTab({
              url: Routes.Profile,
            });
          }
          if (res.cancel) {
            Taro.navigateBack();
          }
        },
      });
      return;
    }
    // if not remaining times, show message
    if (!this.viewStore.enable) {
      Taro.showToast({
        title: `本月已无兑换次数, 下个月再来吧`,
        duration: 3000,
      });
      return;
    }
    // do redeem
    try {
      Taro.showLoading();
      const { code, success } = await MembershipService.new('5', 'monthly_activity');
      if (success) {
        Taro.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
        });
        onSuccess && onSuccess();
      } else {
        let msg: string = '';
        if (code === 301) {
          msg = '你已经拥有更好的会员身份, 无法购买';
        }
        if (code === 302) {
          msg = '本月已无兑换次数, 下个月再来吧';
        }
        Taro.showToast({
          title: msg,
          icon: 'none',
          duration: 2000,
        });
      }
      await sleep(2000);
      Taro.navigateBack();
    } catch (err) {
      console.warn('[redeemFreeMembership]', err);
    } finally {
      Taro.hideLoading();
    }
  };
}

export { FreeMembershipInteractor };
