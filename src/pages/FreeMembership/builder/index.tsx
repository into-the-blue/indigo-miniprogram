import React from 'react';
import { IProps, IInteractor, IPresenter, IViewModel } from '../types';
import ViewModel from '../viewModel';
import { FreeMembershipPresenter } from '../presenter';
import { FreeMembershipInteractor } from '../interactor';
import { getStores } from '@/stores';
import Taro from '@tarojs/taro';

class Builder extends React.Component<IProps> {
  presenter: FreeMembershipPresenter;
  VM: JSX.Element;

  constructor(props: IProps) {
    super(props);
    const interactor = this.buildInteractor();
    const presenterBuilder = this.buildPresenter(interactor);
    this.VM = this.buildViewModel(presenterBuilder);
  }
  componentDidMount() {}
  componentDidShow() {
    getStores('global').global.setCurrentRoute('freeMembership');
  }
  componentDidHide() {
    // Taro.eventCenter.off('atMessage');
  }
  buildInteractor = () => {
    const { freeMembershipStore, userStore } = getStores('freeMembershipStore', 'userStore');
    return new FreeMembershipInteractor(freeMembershipStore, userStore);
  };
  buildPresenter = (interactor: FreeMembershipInteractor) => (viewModel: IViewModel) => {
    return new FreeMembershipPresenter(interactor, viewModel);
  };
  buildViewModel = (buildPresenter: (viewModel: IViewModel) => FreeMembershipPresenter) => {
    // @ts-ignore
    return <ViewModel buildPresenter={buildPresenter} />;
  };
  render() {
    return this.VM;
  }
}

export default Builder;
