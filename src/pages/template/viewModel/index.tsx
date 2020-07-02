import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, ScrollView } from '@tarojs/components';
// import {} from 'taro-ui';
import { IViewModel, IViewModelProps } from '../types';
import { TemplatePresenter } from '../presenter';
import {} from '../interactor';
import {} from '../stores';
import { Text } from '@/components';

@inject('global')
@observer
class TemplateViewModel extends React.Component<IViewModelProps> implements IViewModel {
  presenter: TemplatePresenter;

  constructor(props: IViewModelProps) {
    super(props);

    this.presenter = this.props.buildPresenter(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

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
