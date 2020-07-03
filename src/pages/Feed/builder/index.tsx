import React from 'react';
import { IProps, IViewModel } from '../types';
import ViewModel from '../viewModel/viewModel';
import { FeedPresenter } from '../presenter';
import { FeedInteractor } from '../interactor';
import { getStores } from '@/stores';
import { Routes } from '@/utils/constants';
import Taro from '@tarojs/taro';

class Builder extends React.Component<IProps> {
  presenter: FeedPresenter;
  VM: JSX.Element;
  constructor(props: IProps) {
    super(props);
    const interactor = this.buildInteractor();
    const buildPresenter = this.buildPresenter(interactor);
    this.VM = this.buildViewModel(buildPresenter);
  }
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidShow() {
    getStores('global').global.setCurrentRoute('feed');
  }

  componentDidHide() {
    // Taro.eventCenter.off('atMessage');
  }

  onShareAppMessage() {
    return {
      title: '我在用安隅找房, 不来看看嘛?',
      path: Routes.Feed,
    };
  }

  buildInteractor = () => {
    const { feed, mMap, userStore, global } = getStores('feed', 'mMap', 'userStore', 'global');
    return new FeedInteractor(feed, mMap, userStore, global);
  };
  buildPresenter = (interactor: FeedInteractor) => (viewModel: IViewModel) => {
    return new FeedPresenter(interactor, viewModel);
  };
  buildViewModel = (buildPresenter: (viewModel: IViewModel) => FeedPresenter) => {
    // @ts-ignore
    return <ViewModel buildPresenter={buildPresenter} />;
  };
  render() {
    return this.VM;
  }
}

export default Builder;
