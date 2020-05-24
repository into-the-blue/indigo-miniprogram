import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, ScrollView, Text } from '@tarojs/components';
// import {} from 'taro-ui';
import { IViewModel, IViewModalProps } from '../types';
import { ApartmentInfoPresenter } from '../presenter';
import {} from '../interactor';
import {} from '../stores';
import { injectXeno } from '@/xeno';

@inject('global')
@observer
class ApartmentInfoViewModel extends React.Component<IViewModalProps> implements IViewModel {
  presenter: ApartmentInfoPresenter;

  constructor(props: IViewModalProps) {
    super(props);

    this.presenter = this.props.buildPresenter(this);
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  get getProps() {
    return this.props;
  }

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

export default injectXeno(ApartmentInfoViewModel);
