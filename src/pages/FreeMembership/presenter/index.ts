import { IPresenter, IViewModel } from '../types';
import { FreeMembershipInteractor } from '../interactor';
import Taro from '@tarojs/taro';

class FreeMembershipPresenter implements IPresenter {
  constructor(public interactor: FreeMembershipInteractor, public viewModel: IViewModel) {}

  componentDidMount() {
    Taro.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ffd977',
      animation: {
        duration: 400,
        timingFunc: 'easeIn',
      },
    });
    this.interactor.getFreeMembershipInfo();
  }
  componentWillUnmount() {}

  onPressRedeem = () => {
    this.interactor.redeemFreeMembership(() =>
      this.viewModel.getProps.next('Feed_queryMemberInfo'),
    );
  };

  goToLogin = () => {
    this.interactor.goToProfileTab();
  };
}
export { FreeMembershipPresenter };
