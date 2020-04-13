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

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { target, targetInfo, targetType } = this.props.editSubscriptionStore!;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <TargetInfo type={targetType} info={targetInfo} />
          <ConfigureConditions />
        </ScrollView>
      </View>
    );
  }
}

export default EditSubscriptionViewModel;
