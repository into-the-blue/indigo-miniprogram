import React from 'react';
import { IProps, IInteractor, IPresenter, IViewModel } from '../types';
import ViewModel from '../viewModel/viewModel';
import { TemplatePresenter } from '../presenter';
import { TemplateInteractor } from '../interactor';

class Builder extends React.Component<IProps> {
  presenter: TemplatePresenter;
  VM: JSX.Element;

  constructor(props: IProps) {
    super(props);
    const interactor = this.buildInteractor();
    const presenterBuilder = this.buildPresenter(interactor);
    this.VM = this.buildViewModel(presenterBuilder);
  }
  componentDidMount() {}
  buildInteractor = () => {
    return new TemplateInteractor();
  };
  buildPresenter = (interactor: TemplateInteractor) => (viewModel: IViewModel) => {
    return new TemplatePresenter(interactor, viewModel);
  };
  buildViewModel = (buildPresenter: (viewModel: IViewModel) => TemplatePresenter) => {
    // @ts-ignore
    return <ViewModel buildPresenter={buildPresenter} />;
  };
  render() {
    return this.VM;
  }
}

export default Builder;
