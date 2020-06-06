import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, ScrollView, Text, Button } from '@tarojs/components';
// import {} from 'taro-ui';
import { IViewModel, IViewModelProps } from '../types';
import { FreeMembershipPresenter } from '../presenter';
import {} from '../interactor';
import {} from '../stores';
import { BaseView } from '@/components';

@inject('freeMembershipStore')
@observer
class FreeMembershipViewModel extends React.Component<IViewModelProps> implements IViewModel {
  presenter: FreeMembershipPresenter;

  constructor(props: IViewModelProps) {
    super(props);

    this.presenter = this.props.buildPresenter(this);
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  componentWillUnmount() {}

  render() {
    const { isError, isLoading, remainingRedeemTimes } = this.props.freeMembershipStore!;
    return (
      <BaseView isLoading={isLoading} isError={isError}>
        <Text>{'每个账号每月可免费兑换2次会员机会'}</Text>
        <Text>{'可以基本满足一般用户的需求'}</Text>
        <Text>{`剩余可兑换次数 ${remainingRedeemTimes} 次`}</Text>

        <Button disabled={remainingRedeemTimes === 0}>{'兑换'}</Button>
      </BaseView>
    );
  }
}

export default FreeMembershipViewModel;
