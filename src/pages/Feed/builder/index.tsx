import React from 'react';
import {} from '@tarojs/taro';
import { IProps, IViewModel } from '../types';
import ViewModel from '../viewModel/viewModel';
import { FeedPresenter } from '../presenter';
import { FeedInteractor } from '../interactor';
import { getStores } from '@/store';

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
  buildInteractor = () => {
    const { feed, mMap, userStore } = getStores('feed', 'mMap', 'userStore');
    return new FeedInteractor(feed, mMap, userStore);
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
