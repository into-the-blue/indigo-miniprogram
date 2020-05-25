import { IPresenter, IViewModel } from '../types';
import { ProfileInteractor } from '../interactor';
import Taro from '@tarojs/taro';
import { ISubscriptionClient, ISubscription } from '@/types';
import { Routes } from '@/utils/constants';

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

  onPressSubscription = (sub: ISubscriptionClient) => {
    this.viewModel.getProps.next('NotificationRecords_init', {
      guaranteed: true,
      data: {
        subscription: sub,
      },
    });
    Taro.navigateTo({
      url: Routes.NotificationRecords,
    });
  };

  onPressEdit = (subscription: ISubscriptionClient) => {
    console.warn(subscription.payload);
    const target = this.interactor.getEditSubscriptionTarget('metroStation', subscription)!;
    this.viewModel.getProps.next('EditSubscription_init', {
      guaranteed: true,
      data: {
        target: target as any,
      },
    });
    Taro.navigateTo({
      url: Routes.EditSubscription,
    });
  };

  onDeleteSubscription = async (subscriptionId: string) => {
    this.interactor.deleteSubscription(subscriptionId);
  };
}
export { ProfilePresenter };
