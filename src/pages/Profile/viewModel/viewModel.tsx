import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, ScrollView } from '@tarojs/components';
import { AtMessage } from 'taro-ui';
import { IViewModel, IViewModelProps } from '../types';
import { ProfilePresenter } from '../presenter';
import { Button } from '@/components';
import { UserInfo } from './components/UserInfo';
import UserSubscriptions from './components/UserSubscriptions';
import { injectXeno } from '@/xeno';
import { MemberInfo } from './components/MemberInfo';
import { LoginPrompt } from './components/LoginPrompt';

@inject('global', 'userStore', 'subscriptionStore')
@observer
class ProfileViewModel extends React.Component<IViewModelProps> implements IViewModel {
  presenter: ProfilePresenter;

  constructor(props: IViewModelProps) {
    super(props);

    this.presenter = this.props.buildPresenter(this);
  }

  componentDidMount() {
    console.warn('[Profile page]', 'mount');
    this.presenter.componentDidMount();
  }

  componentWillUnmount() {}

  get getProps() {
    return this.props;
  }

  render() {
    const { userInfo, isLoggedIn, memberInfo } = this.props.userStore!;
    const { userSubscriptions } = this.props.subscriptionStore!;
    return (
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <AtMessage />
        <ScrollView>
          {isLoggedIn && (
            <React.Fragment>
              <UserInfo userInfo={userInfo!} />
              <MemberInfo info={memberInfo} />
              <UserSubscriptions
                onPressSubscription={this.presenter.onPressSubscription}
                onDelete={this.presenter.onDeleteSubscription}
                subscriptions={userSubscriptions}
                onPressEdit={this.presenter.onPressEdit}
              />
            </React.Fragment>
          )}
          {!isLoggedIn && <LoginPrompt onGrantWechatInfo={this.presenter.onGrantWechatInfo} />}
        </ScrollView>
      </View>
    );
  }
}

export default injectXeno(ProfileViewModel);
