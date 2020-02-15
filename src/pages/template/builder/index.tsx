import React from 'react';
import { Config } from '@tarojs/taro';
import { IProps, IInteractor, IPresenter, IViewModel } from '../types';
import ViewModel from '../viewModel/viewModel';
import { TemplatePresenter } from '../presenter';
import { TemplateInteractor } from '../interactor';

class Builder extends React.Component<IProps> {

  presenter: TemplatePresenter;
  VM: JSX.Element;

  config: Config = {
    navigationBarTitleText: '首页',
  };
  constructor(props: IProps) {
    super(props);
    const interactor = this.buildInteractor();
    this.presenter = this.buildPresenter(interactor);
    this.VM = this.buildViewModel(this.presenter);
  }
  componentDidMount() {}
  buildInteractor = () => {
    return new TemplateInteractor();
  };
  buildPresenter = (interactor: IInteractor) => {
    return new TemplatePresenter(interactor);
  };
  buildViewModel = (presenter: TemplatePresenter) => {
    return <ViewModel presenter={presenter} />;
  };
  render() {
    return this.VM;
  }
}

export default Builder;
