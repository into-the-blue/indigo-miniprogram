import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, ScrollView, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { IViewModel } from '../types';
import { NotificationRecordsPresenter } from '../presenter';
import {} from '../interactor';
import { NotificationRecordsStore } from '../stores';
import { BaseView } from '@/components';
import { Records } from './components/Records';

interface IProps {
  buildPresenter: (viewModel: IViewModel) => NotificationRecordsPresenter;
  notificationRecordsStore?: NotificationRecordsStore;
}

@inject('notificationRecordsStore')
@observer
class NotificationRecordsViewModel extends React.Component<IProps> implements IViewModel {
  presenter: NotificationRecordsPresenter;

  constructor(props: IProps) {
    super(props);

    this.presenter = this.props.buildPresenter(this);
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  componentWillUnmount() {
    this.presenter.componentWillUnmount();
  }

  render() {
    const { notificationRecords, isError, isLoading } = this.props.notificationRecordsStore!;
    console.warn('[asdasd]', isLoading);
    return (
      <View style={{ flex: 1 }}>
        <BaseView
          isError={isError}
          isLoading={isLoading}
          onPressRetry={this.presenter.initialQuerys}
        >
          <ScrollView>
            <Records notificationRecords={notificationRecords} />
          </ScrollView>
        </BaseView>
      </View>
    );
  }
}

export default NotificationRecordsViewModel;
