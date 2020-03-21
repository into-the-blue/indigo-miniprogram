import { action, observable, computed } from 'mobx';
import { nextState, IUserInfo } from '@/types';
import Taro from '@tarojs/taro';
import { AuthClient } from '@/services/auth';
import { UserClient } from '@/services/user';
import { Cache } from '@/utils';

class UserStore {
  @observable userInfo?: IUserInfo;

  @action setState: <K extends keyof UserStore>(next: nextState<UserStore, K>) => void = next => {
    Object.assign(this, next);
  };

  login = async (encryptedData: string, iv: string) => {
    const res = await Taro.login();
    const sessionKey = await AuthClient.login(res.code);
    return AuthClient.wechatAuth(encryptedData, iv, sessionKey);
  };

  @computed get isLoggedIn() {
    return !!this.userInfo;
  }

  initUserInfo = async () => {
    const cached = await Cache.get('userInfo');
    if (cached) {
      this.setState({
        userInfo: cached,
      });
    }
    const userInfo = await UserClient.queryUserInfo();
    this.setState({
      userInfo,
    });
    Cache.set('userInfo', userInfo);
    return userInfo;
  };
}

export { UserStore };
