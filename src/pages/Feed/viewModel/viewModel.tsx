import React from 'react';
import {} from '@tarojs/taro';
import { observer, inject } from 'mobx-react';
import { View, ScrollView, Text } from '@tarojs/components';
import {} from 'taro-ui';
import { IViewModel } from '../types';
import { FeedPresenter } from '../presenter';
import {} from '../interactor';
import { FeedStore } from '../stores';
// import Tabbar from '@/components/Tabbar';

interface IProps {
  presenter: FeedPresenter;
  feed?: FeedStore;
}

@inject('global')
@observer
class FeedViewModel extends React.Component<IProps, any> implements IViewModel {
  presenter: FeedPresenter;

  constructor(props: IProps) {
    super(props);
    this.state = {
      count: 1,
    };
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
          <Text>{this.state.count}</Text>
        </ScrollView>
        <View className={'row-center'}>
          <Text>{'aa'}</Text>
          <Text>{'add\nbfsdaf'}</Text>
        </View>
        {/* <Tabbar /> */}
      </View>
    );
  }
}

export default FeedViewModel;
