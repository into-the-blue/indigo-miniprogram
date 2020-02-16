import React from 'react';
import {} from '@tarojs/taro';
import { IProps, IInteractor } from '../types';
import ViewModel from '../viewModel/viewModel';
import { FeedPresenter } from '../presenter';
import { FeedInteractor } from '../interactor';
import { useStores } from '@/store';

class Builder extends React.Component<IProps> {
  presenter: FeedPresenter;
  VM: JSX.Element;
  constructor(props: IProps) {
    super(props);
    const interactor = this.buildInteractor();
    this.presenter = this.buildPresenter(interactor);
    this.VM = this.buildViewModel(this.presenter);
  }
  componentDidMount() {}
  buildInteractor = () => {
    const { feed } = useStores('feed');
    return new FeedInteractor(feed);
  };
  buildPresenter = (interactor: FeedInteractor) => {
    return new FeedPresenter(interactor);
  };
  buildViewModel = (presenter: FeedPresenter) => {
    return <ViewModel presenter={presenter} />;
  };
  render() {
    return this.VM;
  }
}

export default Builder;
