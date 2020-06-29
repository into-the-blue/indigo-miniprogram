import { IPresenter, IViewModel } from '../types';
import { NotificationRecordsInteractor } from '../interactor';
import Taro from '@tarojs/taro';
import { XNotificationRecordsInit } from '../eventStation';
import { XExtractData } from '@/types';

class NotificationRecordsPresenter implements IPresenter {
  constructor(public interactor: NotificationRecordsInteractor, public viewModel: IViewModel) {}

  componentDidMount() {
    this.getInitialProps();
  }
  componentWillUnmount() {
    this.interactor.resetState()
  }

  getInitialProps = () => {
    this.viewModel.getProps.on(
      'NotificationRecords_init',
      (data: XExtractData<XNotificationRecordsInit>) => {
        const { subscription } = data;
        if (!subscription) return Taro.navigateBack();
        this.interactor.saveSubscription(subscription);
        this.initialQuerys();
      },
    );
  };

  initialQuerys = () => {
    this.interactor.queryNotificationRecords();
  };

  onPressRecord = (notificationRecordId: string) => {
    this.interactor.onPressRecord(notificationRecordId);
  };
}
export { NotificationRecordsPresenter };
