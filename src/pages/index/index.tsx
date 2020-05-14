import React, { Component, ComponentType } from 'react';
import { View, Button, Text, Map } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { GlobalStore } from '@/stores';
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
    const { count } = this.props.global;
    const coordinate = { lat: 31.2494, lng: 121.397 };
    const setting = {
      skew: 0,
      rotate: 0,
      showLocation: false,
      showScale: false,
      subKey: '',
      layerStyle: -1,
      enableZoom: true,
      enableScroll: true,
      enableRotate: false,
      showCompass: false,
      enable3D: false,
      enableOverlooking: false,
      enableSatellite: false,
      enableTraffic: false,
    };
    return (
      <View className={'index'}>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        {/* <Button onClick={this.incrementAsync}>Add Async</Button> */}
        <Text>{count}</Text>
        <Map
          style={{ width: 400, height: 400 }}
          longitude={coordinate!.lng}
          latitude={coordinate!.lat}
          setting={setting}
          onRegionChange={e => console.warn('sss', e)}
          onTouchMove={e => {
            console.warn('on move: ', e);
          }}
        />
      </View>
    );
  }
}

export default Index as ComponentType;
