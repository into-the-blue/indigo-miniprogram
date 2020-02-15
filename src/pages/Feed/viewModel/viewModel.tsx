import React from 'react';
import { Config } from '@tarojs/taro';
import { observer, inject } from 'mobx-react';
import { View, ScrollView, Text } from '@tarojs/components';
// import {} from 'taro-ui';
import { IViewModel } from '../types';
import { FeedPresenter } from '../presenter';
import {} from '../interactor';
import { FeedStore } from '../stores';

interface IProps {
  presenter: FeedPresenter;
  feed?: FeedStore;
}

@inject('global')
@observer
class FeedViewModel extends React.Component<IProps, any> implements IViewModel {
  presenter: FeedPresenter;

  config: Config = {
    navigationBarTitleText: 'aa',
  };
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
      </View>
    );
  }
}

export default FeedViewModel;
