import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { observer, inject } from 'mobx-react';
import { View, ScrollView, Text, Map } from '@tarojs/components';
// import {} from 'taro-ui';
import { IViewModel } from '../types';
import { FeedPresenter } from '../presenter';
import {} from '../interactor';
import { FeedStore } from '../stores';
// import Tabbar from '@/components/Tabbar';

interface IProps {
  presenter: FeedPresenter;
  feed?: FeedStore;
}

@inject('global', 'feed')
@observer
class FeedViewModel extends Component<IProps> implements IViewModel {
  presenter: FeedPresenter;

  constructor(props: IProps) {
    super(props);
    this.presenter = this.props.presenter;
    this.presenter.setViewModal(this);
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  componentWillUnmount() {
    this.presenter.componentWillUnmount();
  }

  render() {
    const { coordinate } = this.props.feed!;
    return (
      <View style={{ flex: 1 }}>
        {coordinate && <Text>{'asdasd'}</Text>}
        <Map
          style={{ flex: 1, width: '100%', height: '100%' }}
          longitude={coordinate!.lng}
          latitude={coordinate!.lat}
        />

        {/* <Tabbar /> */}
      </View>
    );
  }
}

export default FeedViewModel;
