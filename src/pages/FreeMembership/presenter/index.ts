import { IPresenter, IViewModel } from '../types';
import { FreeMembershipInteractor } from '../interactor';

class FreeMembershipPresenter implements IPresenter {
  constructor(public interactor: FreeMembershipInteractor, public viewModel: IViewModel) {}

  componentDidMount() {
    this.interactor.getFreeMembershipInfo();
  }
  componentWillUnmount() {}

  onPressRedeem = () => {
    this.interactor.redeemFreeMembership(() =>
      this.viewModel.getProps.next('Feed_queryMemberInfo'),
    );
  };
}
export { FreeMembershipPresenter };
