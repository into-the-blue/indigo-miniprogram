import React from 'react';
import { observer, inject } from 'mobx-react';
import { ScrollView } from '@tarojs/components';
import { IViewModel, IViewModelProps } from '../types';
import { NotificationRecordsPresenter } from '../presenter';
import { BaseView, FlexView, Text } from '@/components';
import { Records } from './components/Records';
import { MapComp } from './components/MapComp';
import { MAP_HEIGHT } from '../constants';
import { injectXeno } from '@/xeno';
import { AtMessage } from 'taro-ui';

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
      <BaseView
        isError={isError}
        isLoading={isLoading}
        style={{ backgroundColor: '#eee' }}
        onPressRetry={this.presenter.initialQuerys}
      >
        <AtMessage />
        {subscription && (
          <MapComp
            selectedRecords={selectedRecords}
            subscriptionCoordinates={subscription!.coordinates}
            centralCoordinates={mapCentralCoordinates!}
          />
        )}
        <ScrollView style={{ marginTop: MAP_HEIGHT }}>
          <FlexView column>
            {!isLoading && !notificationRecords.length && (
              <Text style={{ alignSelf: 'center', marginTop: 10 }}>{'空空如也...'}</Text>
            )}
            <Records
              notificationRecords={notificationRecords}
              onPressRecord={this.presenter.onPressRecord}
              selectedRecordIds={selectedRecordIds}
            />
          </FlexView>
        </ScrollView>
      </BaseView>
    );
  }
}

export default injectXeno(NotificationRecordsViewModel);
