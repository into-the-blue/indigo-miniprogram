import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { observer, inject } from 'mobx-react';
import { View, Text, Button } from '@tarojs/components';
// import {} from 'taro-ui';
import { IViewModel } from '../types';
import { FeedPresenter } from '../presenter';
import {} from '../interactor';
import { FeedStore } from '../stores';
import { GlobalStore } from '@/store';
import Map from '@/components/Map';
// import Tabbar from '@/components/Tabbar';

interface IProps {
  feed: FeedStore;
  global: GlobalStore;
  buildPresenter: (viewModel: IViewModel) => FeedPresenter;
}

@inject('global', 'feed', 'mMap')
@observer
class FeedViewModel extends Component<IProps> implements IViewModel {
  presenter: FeedPresenter;

  constructor(props: IProps) {
    super(props);
    this.presenter = this.props.buildPresenter(this);
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  componentWillUnmount() {
    this.presenter.componentWillUnmount();
  }
  increment = () => {
    const { setState, count } = this.props.global;
    setState({
      count: count + 1,
    });
  };

  decrement = () => {
    const { setState, count } = this.props.global;
    setState({
      count: count - 1,
    });
  };
  render() {
    const {} = this.props.feed!;
    const { count } = this.props.global;
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: 'red' }}>
        <Map style={{ display: 'flex', flex: 1 }} />
        {/* <Tabbar /> */}
      </View>
    );
  }
}

export default FeedViewModel;
