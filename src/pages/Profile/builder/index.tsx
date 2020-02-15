import React from 'react';
import { IProps, IInteractor, IPresenter, IViewModel } from '../types';
import ViewModel from '../viewModel/viewModel';
import { ProfilePresenter } from '../presenter';
import { ProfileInteractor } from '../interactor';

class Builder extends React.Component<IProps> {

  presenter: ProfilePresenter;
  VM: JSX.Element;

  constructor(props: IProps) {
    super(props);
    const interactor = this.buildInteractor();
    this.presenter = this.buildPresenter(interactor);
    this.VM = this.buildViewModel(this.presenter);
  }
  componentDidMount() {}
  buildInteractor = () => {
    return new ProfileInteractor();
  };
  buildPresenter = (interactor: IInteractor) => {
    return new ProfilePresenter(interactor);
  };
  buildViewModel = (presenter: ProfilePresenter) => {
    return <ViewModel presenter={presenter} />;
  };
  render() {
    return this.VM;
  }
}

export default Builder;
