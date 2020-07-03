import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, ScrollView } from '@tarojs/components';
import { AtMessage } from 'taro-ui';
import { IViewModel, IViewModelProps } from '../types';
import { ProfilePresenter } from '../presenter';
import { Button, FlexView } from '@/components';
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
    this.presenter.componentDidMount();
  }
  componentWillUnmount() {}

  onTabItemTap(opt: any) {
    console.warn('tab tap', opt);
  }

  get getProps() {
    return this.props;
  }

  render() {
    const { userInfo, isLoggedIn, memberInfo, messageGranted } = this.props.userStore!;
    const { userSubscriptions } = this.props.subscriptionStore!;
    const { isRouteFocused } = this.props.global!;
    return (
      <FlexView column style={{ flex: 1, height: '100vh' }}>
        {isRouteFocused('profile') && <AtMessage />}
        <ScrollView style={{ backgroundColor: '#eee' }}>
          {isLoggedIn && (
            <React.Fragment>
              <UserInfo
                userInfo={userInfo!}
                onPressOpenNotification={this.presenter.onPressOpenNotification}
                messageGranted={messageGranted}
              />
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
      </FlexView>
    );
  }
}

export default injectXeno(ProfileViewModel);
