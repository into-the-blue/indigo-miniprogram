import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, ScrollView, Text } from '@tarojs/components';
// import {} from 'taro-ui';
import { IViewModel } from '../types';
import { ProfilePresenter } from '../presenter';
import {} from '../interactor';
import {} from '../stores';
import Tabbar from '@/components/Tabbar';

interface IProps {
  buildPresenter: (viewModel: IViewModel) => ProfilePresenter;
}

@inject('global')
@observer
class ProfileViewModel extends React.Component<IProps> implements IViewModel {
  presenter: ProfilePresenter;

  constructor(props: IProps) {
    super(props);

    this.presenter = this.props.buildPresenter(this);
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
        <Tabbar />
      </View>
    );
  }
}

export default ProfileViewModel;
