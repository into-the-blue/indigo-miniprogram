import { IInteractor } from '../types';
import { UserStore } from '@/store';
import { Cache } from '@/utils';
import Taro from '@tarojs/taro';

class ProfileInteractor implements IInteractor {
  constructor(public userStore: UserStore) {}

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
}

export { ProfileInteractor };
