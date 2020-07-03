import React from 'react';
import { IProps, IViewModel } from '../types';
import ViewModel from '../viewModel';
import { NotificationRecordsPresenter } from '../presenter';
import { NotificationRecordsInteractor } from '../interactor';
import { getStores } from '@/stores';
import Taro from '@tarojs/taro';
import { Routes } from '@/utils/constants';

class Builder extends React.Component<IProps> {
  presenter: NotificationRecordsPresenter;
  VM: JSX.Element;

  constructor(props: IProps) {
    super(props);
    const interactor = this.buildInteractor();
    const presenterBuilder = this.buildPresenter(interactor);
    this.VM = this.buildViewModel(presenterBuilder);
  }
  componentDidMount() {}
  componentDidShow() {
    getStores('global').global.setCurrentRoute('notificationRecords');
  }
  componentDidHide() {
    // Taro.eventCenter.off('atMessage');
  }

  onShareAppMessage() {
    return {
      title: '该挑哪一个呢...',
      path: Routes.Feed,
    };
  }

  buildInteractor = () => {
    const { notificationRecordsStore, subscriptionStore } = getStores(
      'notificationRecordsStore',
      'subscriptionStore',
    );
    return new NotificationRecordsInteractor(notificationRecordsStore, subscriptionStore);
  };
  buildPresenter = (interactor: NotificationRecordsInteractor) => (viewModel: IViewModel) => {
    return new NotificationRecordsPresenter(interactor, viewModel);
  };
  buildViewModel = (buildPresenter: (viewModel: IViewModel) => NotificationRecordsPresenter) => {
    // @ts-ignore
    return <ViewModel buildPresenter={buildPresenter} />;
  };
  render() {
    return this.VM;
  }
}

export default Builder;
