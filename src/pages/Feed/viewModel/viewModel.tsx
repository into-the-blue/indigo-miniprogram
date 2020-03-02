import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { observer, inject } from 'mobx-react';
import { View, Text, Button, Map } from '@tarojs/components';
// import {} from 'taro-ui';
import { IViewModel } from '../types';
import { FeedPresenter } from '../presenter';
import {} from '../interactor';
import { FeedStore } from '../stores';
import { GlobalStore, MapStore } from '@/store';
import Tabbar from '@/components/Tabbar';

interface IProps {
  feed: FeedStore;
  global: GlobalStore;
  buildPresenter: (viewModel: IViewModel) => FeedPresenter;
  mMap: MapStore;
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
    const { currentCoordinate, setting } = this.props.mMap;
    return (
      <View className={'page-container'}>
        <View style={{ display: 'flex', flex: 1 }}>
          {currentCoordinate && (
            <Map
              style={{ width: '100%', height: '100%' }}
              longitude={currentCoordinate.lng}
              latitude={currentCoordinate.lat}
              setting={setting}
              onRegionChange={e => console.warn(e)}
              onTouchMove={e => {
                console.warn('on move: ', e);
              }}
            />
          )}
        </View>
        <Tabbar />
      </View>
    );
  }
}

export default FeedViewModel;
