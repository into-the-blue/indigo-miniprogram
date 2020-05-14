import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, ScrollView, Text } from '@tarojs/components';
import Taro from '@tarojs/taro'
import { IViewModel } from '../types';
import { NotificationRecordsPresenter } from '../presenter';
import {} from '../interactor';
import {} from '../stores';


interface IProps {
  buildPresenter: (viewModel: IViewModel) => NotificationRecordsPresenter;
}

@inject('global')
@observer
class NotificationRecordsViewModel extends React.Component<IProps> implements IViewModel {
  presenter: NotificationRecordsPresenter;

  constructor(props: IProps) {
    super(props);

    this.presenter = this.props.buildPresenter(this);
  }

  
  componentDidMount() {
    this.presenter.componentDidMount()
  }

  componentWillUnmount() {
    this.presenter.componentWillUnmount()
  }
  
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

export default NotificationRecordsViewModel;
