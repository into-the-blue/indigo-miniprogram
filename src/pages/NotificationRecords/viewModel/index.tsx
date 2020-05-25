import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, ScrollView } from '@tarojs/components';
import { IViewModel, IViewModelProps } from '../types';
import { NotificationRecordsPresenter } from '../presenter';
import { BaseView } from '@/components';
import { Records } from './components/Records';
import { MapComp } from './components/MapComp';
import { MAP_HEIGHT } from '../constants';
import { injectXeno } from '@/xeno';

@inject('notificationRecordsStore')
@observer
class NotificationRecordsViewModel extends React.Component<IViewModelProps> implements IViewModel {
  presenter: NotificationRecordsPresenter;

  constructor(props: IViewModelProps) {
    super(props);
    this.presenter = this.props.buildPresenter(this);
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  componentWillUnmount() {
    this.presenter.componentWillUnmount();
  }

  get getProps() {
    return this.props;
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

export default injectXeno(NotificationRecordsViewModel);
