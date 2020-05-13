import { apiClient } from '@/utils';
import { IUserInfo } from '@/types';

class AuthClient {
  static login = async (code: string): Promise<string> => {
    const { data } = await apiClient.post('/auth/login', {
      type: 'wechat_mp',
      code,
    });
    return data.data.sessionKey;
  };

  static wechatAuth = async (
    encryptedData: string,
    iv: string,
    sessionKey: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    userInfo: IUserInfo;
    isNew: boolean;
  }> => {
    const { data } = await apiClient.post('/auth/wechat_auth', {
      encryptedData,
      iv,
      sessionKey,
    });
    return data.data;
  };
}

export { AuthClient };
