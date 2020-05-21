import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, ScrollView, Text } from '@tarojs/components';
// import {} from 'taro-ui';
import { IViewModel } from '../types';
import { ApartmentInfoPresenter } from '../presenter';
import {} from '../interactor';
import {} from '../stores';

interface IProps {
  buildPresenter: (viewModel: IViewModel) => ApartmentInfoPresenter;
}

@inject('global')
@observer
class ApartmentInfoViewModel extends React.Component<IProps> implements IViewModel {
  presenter: ApartmentInfoPresenter;

  constructor(props: IProps) {
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

export default ApartmentInfoViewModel;
