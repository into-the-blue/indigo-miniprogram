import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, ScrollView } from '@tarojs/components';
import {} from 'taro-ui';
import { IViewModel } from '../types';
import { ProfilePresenter } from '../presenter';
import {} from '../interactor';
import {} from '../stores';
import {} from '@/services/user';
import { Button } from '@/components';
import { UserInfo } from './components/UserInfoCard';
import { UserStore } from '@/store';

interface IProps {
  buildPresenter: (viewModel: IViewModel) => ProfilePresenter;
  userStore?: UserStore;
}

@inject('global', 'userStore')
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
    return (
      <View style={{ flex: 1 }}>
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
        </ScrollView>
      </View>
    );
  }
}

export default ProfileViewModel;
