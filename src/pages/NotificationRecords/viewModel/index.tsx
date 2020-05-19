import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { IViewModel } from '../types';
import { NotificationRecordsPresenter } from '../presenter';
import {} from '../interactor';
import { NotificationRecordsStore } from '../stores';
import { BaseView } from '@/components';
import { Records } from './components/Records';
import { MapComp } from './components/MapComp';
import { SCREEN_WIDTH } from '@/utils/constants';
import { toJS } from 'mobx';
import { MAP_HEIGHT } from '../constants';

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
    const {
      notificationRecords,
      isError,
      isLoading,
      selectedRecordIds,
      selectedRecords,
      subscription,
      mapCentralCoordinates,
    } = this.props.notificationRecordsStore!;
    return (
      <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <BaseView
          isError={isError}
          isLoading={isLoading}
          onPressRetry={this.presenter.initialQuerys}
        >
          {subscription && (
            <MapComp
              selectedRecords={selectedRecords}
              subscriptionCoordinates={subscription!.coordinates}
              centralCoordinates={mapCentralCoordinates!}
            />
          )}
          <ScrollView style={{ marginTop: MAP_HEIGHT }}>
            <Records
              notificationRecords={notificationRecords}
              onPressRecord={this.presenter.onPressRecord}
              selectedRecordIds={selectedRecordIds}
            />
          </ScrollView>
        </BaseView>
      </View>
    );
  }
}

export default NotificationRecordsViewModel;
