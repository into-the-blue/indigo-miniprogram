import React from 'react';
import { IProps, IInteractor, IPresenter, IViewModel } from '../types';
import ViewModel from '../viewModel';
import { ApartmentInfoPresenter } from '../presenter';
import { ApartmentInfoInteractor } from '../interactor';

class Builder extends React.Component<IProps> {
  presenter: ApartmentInfoPresenter;
  VM: JSX.Element;

  constructor(props: IProps) {
    super(props);
    const interactor = this.buildInteractor();
    const presenterBuilder = this.buildPresenter(interactor);
    this.VM = this.buildViewModel(presenterBuilder);
  }
  componentDidMount() {}
  buildInteractor = () => {
    return new ApartmentInfoInteractor();
  };
  buildPresenter = (interactor: ApartmentInfoInteractor) => (viewModel: IViewModel) => {
    return new ApartmentInfoPresenter(interactor, viewModel);
  };
  buildViewModel = (buildPresenter: (viewModel: IViewModel) => ApartmentInfoPresenter) => {
    // @ts-ignore
    return <ViewModel buildPresenter={buildPresenter} />;
  };
  render() {
    return this.VM;
  }
}

export default Builder;