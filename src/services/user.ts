import { apiClient } from '@/utils';
import { IUserInfo } from '@/types';

class UserClient {
  static queryUserInfo = async (): Promise<IUserInfo> => {
    const { data } = await apiClient.get('/users/info');
    return data.data;
  };

  static grantWechatMessage = async () => {
    return apiClient.post('/users/grant_wechat_message');
  };
}

export { UserClient };
