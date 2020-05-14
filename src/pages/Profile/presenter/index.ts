import { IPresenter, IViewModel } from '../types';
import { ProfileInteractor } from '../interactor';
import Taro from '@tarojs/taro';
import { ISubscriptionClient, ISubscription } from '@/types';

class ProfilePresenter implements IPresenter {
  constructor(public interactor: ProfileInteractor, public viewModel: IViewModel) {}

  async componentDidMount() {
    Taro.hideHomeButton();
    this.queryUserSubscriptions();
  }
  componentWillUnmount() {}

  onGetUserInfo = async ({ detail: { userInfo, encryptedData, iv } }) => {
    this.interactor.login(encryptedData, iv);
  };

  queryUserSubscriptions = () => {
    this.interactor.queryUserSubscriptions();
  };

  onPressSubscription = (sub: ISubscription) => {
    Taro.navigateTo({
      url: '../../NotificationRecords/builder/index?subscriptionId=' + sub.id!,
    });
  };

  onPressEdit = (subscription: ISubscriptionClient) => {
    console.warn(subscription.payload);
    this.interactor.setMetroStationAsSubscriptionTarget({
      coordinates: subscription.coordinates,
      ...(subscription.payload as any),
    });
    Taro.navigateTo({
      url: '../../EditSubscription/builder/index',
    });
  };

  onDeleteSubscription = async (subscriptionId: string) => {
    this.interactor.deleteSubscription(subscriptionId);
  };
}
export { ProfilePresenter };
