import { action, observable, computed } from 'mobx';
import { nextState, IUserInfo, IMemberInfo } from '@/types';
import Taro from '@tarojs/taro';
import { AuthClient } from '@/services/auth';
import { UserClient } from '@/services/user';
import { Cache } from '@/utils';
import dayjs from 'dayjs';
import get from 'lodash.get';

class UserStore {
  @observable userInfo?: IUserInfo;
  @observable memberInfo: IMemberInfo | null = null;
  @observable messageDeined: boolean = false;

  @action setState: <K extends keyof UserStore>(next: nextState<UserStore, K>) => void = next => {
    Object.assign(this, next);
  };

  @computed get messageGranted() {
    return get(this.userInfo, 'wechatMessageEnable', false);
  }

  @action grantMessage = () => {
    this.messageDeined = false;
    if (!this.userInfo) return;
    this.userInfo = {
      ...this.userInfo,
      wechatMessageEnable: true,
    };
  };
  @action denyMessage = () => {
    this.messageDeined = true;
  };

  login = async (encryptedData: string, iv: string) => {
    const res = await Taro.login();
    const sessionKey = await AuthClient.login(res.code);
    return AuthClient.wechatAuth(encryptedData, iv, sessionKey);
  };

  @computed get isLoggedIn() {
    return !!this.userInfo;
  }

  @computed get isMembershipExpired() {
    if (!this.memberInfo) return true;
    return dayjs(this.memberInfo.expireAt).isBefore(dayjs());
  }

  @computed get isMember() {
    if (!this.memberInfo) return false;
    return dayjs().isBefore(dayjs(this.memberInfo.expireAt));
  }

  initUserInfo = async () => {
    // const cached = await Cache.get('userInfo');
    // if (cached) {
    //   this.setState({
    //     userInfo: cached,
    //   });
    // }
    const userInfo = await UserClient.queryUserInfo();
    console.warn('[initUserInfo]', userInfo);
    this.setState({
      userInfo,
      memberInfo: userInfo.memberInfo,
    });
    Cache.set('userInfo', userInfo);
    return userInfo;
  };
}

export { UserStore };
