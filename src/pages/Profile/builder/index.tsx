import React from 'react';
import { IProps, IInteractor, IPresenter, IViewModel } from '../types';
import ViewModel from '../viewModel/viewModel';
import { ProfilePresenter } from '../presenter';
import { ProfileInteractor } from '../interactor';
import { getStores } from '@/stores';

class Builder extends React.Component<IProps> {
  presenter: ProfilePresenter;
  VM: JSX.Element;

  constructor(props: IProps) {
    super(props);
    const interactor = this.buildInteractor();
    const presenterBuilder = this.buildPresenter(interactor);
    this.VM = this.buildViewModel(presenterBuilder);
  }
  componentDidMount() {}
  buildInteractor = () => {
    const { userStore, subscriptionStore } = getStores('userStore', 'subscriptionStore');
    return new ProfileInteractor(userStore, subscriptionStore);
  };
  buildPresenter = (interactor: ProfileInteractor) => (viewModel: IViewModel) => {
    return new ProfilePresenter(interactor, viewModel);
  };
  buildViewModel = (buildPresenter: (viewModel: IViewModel) => ProfilePresenter) => {
    // @ts-ignore
    return <ViewModel buildPresenter={buildPresenter} />;
  };
  render() {
    return this.VM;
  }
}

export default Builder;
