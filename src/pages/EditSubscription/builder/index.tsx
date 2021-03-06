import React from 'react';
import { IProps, IInteractor, IPresenter, IViewModel } from '../types';
import ViewModel from '../viewModel';
import { EditSubscriptionPresenter } from '../presenter';
import { EditSubscriptionInteractor } from '../interactor';
import { getStores } from '@/stores';
import Taro from '@tarojs/taro';

class Builder extends React.Component<IProps> {
  presenter: EditSubscriptionPresenter;
  VM: JSX.Element;

  constructor(props: IProps) {
    super(props);
    const interactor = this.buildInteractor();
    const presenterBuilder = this.buildPresenter(interactor);
    this.VM = this.buildViewModel(presenterBuilder);
  }
  componentDidMount() {}
  componentDidShow() {
    getStores('global').global.setCurrentRoute('editSubscription');
  }
  componentDidHide() {
    // Taro.eventCenter.off('atMessage');
  }
  buildInteractor = () => {
    const { userStore, editSubscriptionStore, mMap } = getStores(
      'userStore',
      'editSubscriptionStore',
      'mMap',
    );
    return new EditSubscriptionInteractor(userStore, editSubscriptionStore, mMap);
  };
  buildPresenter = (interactor: EditSubscriptionInteractor) => (viewModel: IViewModel) => {
    return new EditSubscriptionPresenter(interactor, viewModel);
  };
  buildViewModel = (buildPresenter: (viewModel: IViewModel) => EditSubscriptionPresenter) => {
    // @ts-ignore
    return <ViewModel buildPresenter={buildPresenter} />;
  };
  render() {
    return this.VM;
  }
}

export default Builder;
