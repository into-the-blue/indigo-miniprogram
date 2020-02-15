import React, { Component, ComponentType } from 'react';
import { View, Button, Text } from '@tarojs/components';
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
    return (
      <View className={'index'}>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{count}</Text>
      </View>
    );
  }
}

export default Index as ComponentType;
