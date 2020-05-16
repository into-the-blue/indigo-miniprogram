import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, ScrollView } from '@tarojs/components';
import { AtMessage } from 'taro-ui';
import { IViewModel } from '../types';
import { ProfilePresenter } from '../presenter';
import {} from '../interactor';
import {} from '../stores';
import {} from '@/services/user';
import { Button } from '@/components';
import { UserInfo } from './components/UserInfo';
import { UserStore, SubscriptionStore } from '@/stores';
import UserSubscriptions from './components/UserSubscriptions';

interface IProps {
  buildPresenter: (viewModel: IViewModel) => ProfilePresenter;
  userStore?: UserStore;
  subscriptionStore?: SubscriptionStore;
}

@inject('global', 'userStore', 'subscriptionStore')
@observer
class ProfileViewModel extends React.Component<IProps> implements IViewModel {
  presenter: ProfilePresenter;

  constructor(props: IProps) {
    super(props);

    this.presenter = this.props.buildPresenter(this);
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  componentWillUnmount() {}
  render() {
    const { userInfo, isLoggedIn } = this.props.userStore!;
    const { userSubscriptions } = this.props.subscriptionStore!;
    return (
      <View style={{ flex: 1 }}>
        <AtMessage />
        <ScrollView>
          {isLoggedIn ? (
            <UserInfo userInfo={userInfo!} />
          ) : (
            <Button
              openType={'getUserInfo'}
              type={'primary'}
              onGetUserInfo={this.presenter.onGetUserInfo}
            >
              {'Get user info'}
            </Button>
          )}
          <UserSubscriptions
            onPressSubscription={this.presenter.onPressSubscription}
            onDelete={this.presenter.onDeleteSubscription}
            subscriptions={userSubscriptions}
            onPressEdit={this.presenter.onPressEdit}
          />
        </ScrollView>
      </View>
    );
  }
}

export default ProfileViewModel;
