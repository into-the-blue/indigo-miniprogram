import React from 'react';
import { Config } from '@tarojs/taro';
import { observer, inject } from 'mobx-react';
import { View, ScrollView, Text } from '@tarojs/components';
// import {} from 'taro-ui';
import { IViewModel } from '../types';
import { ProfilePresenter } from '../presenter';
import {} from '../interactor';
import {} from '../stores';
// import Tabbar from '@/components/Tabbar';

interface IProps {
  presenter: ProfilePresenter;
}

@inject('global')
@observer
class ProfileViewModel extends React.Component<IProps> implements IViewModel {
  presenter: ProfilePresenter;

  config: Config = {
    navigationBarTitleText: 'aa',
  };
  constructor(props: IProps) {
    super(props);

    this.presenter = this.props.presenter;
    this.presenter.setViewModal(this);
  }
  componentWillMount() {}
  componentDidMount() {}
  render() {
    // const { count } = this.props.feed!;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Text>{'feed'}</Text>
        </ScrollView>
        {/* <Tabbar /> */}
      </View>
    );
  }
}

export default ProfileViewModel;
