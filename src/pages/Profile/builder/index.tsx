import React from 'react';
import { IProps, IInteractor, IPresenter, IViewModel } from '../types';
import ViewModel from '../viewModel/viewModel';
import { ProfilePresenter } from '../presenter';
import { ProfileInteractor } from '../interactor';
import { getStores } from '@/stores';
import Taro from '@tarojs/taro';

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

  /**
   *
   *
   * @param {*} opt
   * @memberof Builder
   * 
   * index: 1
      pagePath: "pages/Profile/builder/index"
      text: "我的"
   */
  // onTabItemTap(opt: any) {
  //   console.warn('[profile tab tap]', opt);
  // }
  // 对应 onShow
  componentDidShow() {
    getStores('global').global.setCurrentRoute('profile');
  }

  componentDidHide() {
    // Taro.eventCenter.off('atMessage');
  }
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
