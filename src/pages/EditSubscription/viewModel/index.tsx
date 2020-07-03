import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, ScrollView } from '@tarojs/components';
import { IViewModel, IViewModelProps } from '../types';
import { EditSubscriptionPresenter } from '../presenter';
import {} from '../interactor';
import TargetInfo from './components/TargetInfo';
import { ConfigureConditions } from '@/components/ConfigureConditions';
import EditRadius from './components/EditRadius';
import { AtMessage } from 'taro-ui';
import { injectXeno } from '@/xeno';
import { BaseView } from '@/components';

@inject('editSubscriptionStore')
@observer
class EditSubscriptionViewModel extends React.Component<IViewModelProps> implements IViewModel {
  presenter: EditSubscriptionPresenter;

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
      targetInfo,
      targetType,
      radius,
      setRadius,
      isUpdating,
      target,
    } = this.props.editSubscriptionStore!;
    return (
      <BaseView isLoading={!target} style={{ backgroundColor: '#eee' }}>
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
      </BaseView>
    );
  }
}

export default injectXeno(EditSubscriptionViewModel);
