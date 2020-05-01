import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, ScrollView, Text } from '@tarojs/components';
// import {} from 'taro-ui';
import { IViewModel } from '../types';
import { EditSubscriptionPresenter } from '../presenter';
import {} from '../interactor';
import { EditSubscriptionStore } from '../stores';
import TargetInfo from './components/TargetInfo';
import { ConfigureConditions } from '@/components/ConfigureConditions';
import EditRadius from './components/EditRadius';
import { AtMessage } from 'taro-ui';

interface IProps {
  buildPresenter: (viewModel: IViewModel) => EditSubscriptionPresenter;
  editSubscriptionStore?: EditSubscriptionStore;
}

@inject('editSubscriptionStore')
@observer
class EditSubscriptionViewModel extends React.Component<IProps> implements IViewModel {
  presenter: EditSubscriptionPresenter;

  constructor(props: IProps) {
    super(props);

    this.presenter = this.props.buildPresenter(this);
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  componentWillUnmount() {}

  render() {
    const {
      targetInfo,
      targetType,
      radius,
      setRadius,
      isUpdating,
    } = this.props.editSubscriptionStore!;
    return (
      <View style={{ flex: 1 }}>
        <AtMessage />
        <ScrollView style={{ flex: 1 }}>
          <TargetInfo
            type={targetType}
            info={targetInfo}
            isUpdating={isUpdating}
            onPressSave={this.presenter.onPressSave}
          />

          <EditRadius radius={radius} setRadius={setRadius} />
          <ConfigureConditions />
        </ScrollView>
      </View>
    );
  }
}

export default EditSubscriptionViewModel;
