import { IPresenter, IViewModel } from '../types';
import { ProfileInteractor } from '../interactor';
import Taro from '@tarojs/taro';
import { ISubscriptionClient, ISubscription } from '@/types';
import { Routes } from '@/utils/constants';

class ProfilePresenter implements IPresenter {
  constructor(public interactor: ProfileInteractor, public viewModel: IViewModel) {}

  async componentDidMount() {
    const source = Taro.Current.router?.params['source'];
    if (source === 'notification') {
      // do something
      Taro.atMessage({
        type: 'success',
        message: '请继续授权发送通知哦~~',
        duration: 5000,
      });
    }
    Taro.hideHomeButton();
    this.interactor.queryUserSubscriptions();
    this.viewModel.getProps.on('Global_userLogIn', this.onUserLogIn);
  }
  componentWillUnmount() {}

  onGrantWechatInfo = async ({ detail: { userInfo, encryptedData, iv, errMsg } }) => {
    if (errMsg !== 'getUserInfo:ok') {
      Taro.atMessage({
        type: 'error',
        message: '授权失败...',
      });
      return;
    }

    this.interactor.login(encryptedData, iv, () =>
      this.viewModel.getProps.next('Global_userLogIn'),
    );
  };

  onUserLogIn = () => {
    this.interactor.queryUserSubscriptions();
  };

  onPressSubscription = (sub: ISubscriptionClient) => {
    if (!this.interactor.requestAccessToSubscribeMessage(() => this.onPressSubscription(sub)))
      return;
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
    if (!this.interactor.isValidMember()) return;
    const target = this.interactor.getEditSubscriptionTarget(subscription)!;
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

  onPressOpenNotification = () => {
    this.interactor.requestAccessToSubscribeMessage();
  };
}
export { ProfilePresenter };
