import React from 'react';
import { Config } from '@tarojs/taro';
import { observer, inject } from 'mobx-react';
import { View, ScrollView, Text } from '@tarojs/components';
// import {} from 'taro-ui';
import { IViewModel } from '../types';
import { TemplatePresenter } from '../presenter';
import {} from '../interactor';
import { TemplateStore } from '../stores';

interface IProps {
  presenter: TemplatePresenter;
  feed?: TemplateStore;
}

@inject('global')
@observer
class TemplateViewModel extends React.Component<IProps> implements IViewModel {
  presenter: TemplatePresenter;

  config: Config = {
    navigationBarTitleText: 'aa',
  };
  constructor(props: IProps) {
    super(props);

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
        </ScrollView>
      </View>
    );
  }
}

export default TemplateViewModel;
