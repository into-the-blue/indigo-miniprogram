import React from 'react';
import { IProps, IInteractor, IPresenter, IViewModel } from '../types';
import ViewModel from '../viewModel';
import { SearchPresenter } from '../presenter';
import { SearchInteractor } from '../interactor';
import { getStores } from '@/stores';

class Builder extends React.Component<IProps> {
  presenter: SearchPresenter;
  VM: JSX.Element;

  constructor(props: IProps) {
    super(props);
    const interactor = this.buildInteractor();
    const presenterBuilder = this.buildPresenter(interactor);
    this.VM = this.buildViewModel(presenterBuilder);
  }
  componentDidMount() {}
  buildInteractor = () => {
    const { searchStore } = getStores('searchStore');
    return new SearchInteractor(searchStore);
  };
  buildPresenter = (interactor: SearchInteractor) => (viewModel: IViewModel) => {
    return new SearchPresenter(interactor, viewModel);
  };
  buildViewModel = (buildPresenter: (viewModel: IViewModel) => SearchPresenter) => {
    // @ts-ignore
    return <ViewModel buildPresenter={buildPresenter} />;
  };
  render() {
    return this.VM;
  }
}

export default Builder;
