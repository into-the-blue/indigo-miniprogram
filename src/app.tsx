import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import store from './stores';
import { createXeno } from './utils/xeno';
import { Provider as XenoProvider, Xeno } from './xeno';
import { AtMessage } from 'taro-ui';
import 'taro-ui/dist/style/index.scss';
import './styles/theme.scss'
import './app.scss';
import { View } from '@tarojs/components';

class App extends Component {
  xenoInstance: Xeno<any>;

  constructor(props: any) {
    super(props);
    this.xenoInstance = createXeno();
  }
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 就是要渲染的页面
  render() {
    return (
      <XenoProvider xeno={this.xenoInstance}>
        <Provider {...store}>
          <View>
            <AtMessage />
            {this.props.children}
          </View>
        </Provider>
      </XenoProvider>
    );
  }
}

export default App;
