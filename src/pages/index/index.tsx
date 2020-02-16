import React, { Component, ComponentType } from 'react';
import { View, Button, Text, Map } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { GlobalStore } from '@/store';
// import './index.scss';

interface IProps {
  global: GlobalStore;
}

@inject('global')
@observer
class Index extends Component<IProps> {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

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

  incrementAsync = () => {
    // const { counterStore } = this.props.store;
    // counterStore.incrementAsync();
  };

  render() {
    const {
      count,
      // counterStore: { counter },
    } = this.props.global;
    const coordinate = { lat: 31.2494, lng: 121.397 };
    return (
      <View className={'index'}>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{count}</Text>
        <Map
          style={{ flex: 1, width: '100%', height: '100%' }}
          longitude={coordinate!.lng}
          latitude={coordinate!.lat}
        />
      </View>
    );
  }
}

export default Index as ComponentType;
