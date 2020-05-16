import { IPresenter, IViewModel } from '../types';
import { NotificationRecordsInteractor } from '../interactor';
import Taro from '@tarojs/taro';

class NotificationRecordsPresenter implements IPresenter {
  constructor(public interactor: NotificationRecordsInteractor, public viewModel: IViewModel) {}

  componentDidMount() {
    const { subscriptionId } = Taro.Current.router?.params!;
    console.warn(subscriptionId);
    if (!subscriptionId) {
      //
      return;
    }
    this.interactor.saveSubscriptionId(subscriptionId);
    this.initialQuerys();
  }
  componentWillUnmount() {}

  initialQuerys = () => {
    this.interactor.queryNotificationRecords();
  };
}
export { NotificationRecordsPresenter };
