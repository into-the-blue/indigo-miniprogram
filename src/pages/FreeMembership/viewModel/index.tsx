import React from 'react';
import { observer, inject } from 'mobx-react';
import { IViewModel, IViewModelProps } from '../types';
import { FreeMembershipPresenter } from '../presenter';
import {} from '../interactor';
import {} from '../stores';
import { BaseView, Button, FlexView, Text } from '@/components';
import './styles.scss';
import { injectXeno } from '@/xeno';
import {} from 'taro-ui';

@inject('freeMembershipStore', 'userStore')
@observer
class FreeMembershipViewModel extends React.Component<IViewModelProps> implements IViewModel {
  presenter: FreeMembershipPresenter;

  constructor(props: IViewModelProps) {
    super(props);

    this.presenter = this.props.buildPresenter(this);
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  componentWillUnmount() {}

  get getProps() {
    return this.props;
  }

  render() {
    const { isError, isLoading, remainingRedeemTimes } = this.props.freeMembershipStore!;
    const { isLoggedIn } = this.props.userStore;
    console.warn(isLoading);
    return (
      <BaseView className={'free-membership__container'} isLoading={isLoading} isError={isError}>
        {!isLoggedIn && (
          <Button
            type={'primary'}
            customStyle={{ width: '100%' }}
            onClick={this.presenter.goToLogin}
          >
            {'点击前往登录'}
          </Button>
        )}
        {isLoggedIn && (
          <React.Fragment>
            <Text
              className={'free-membership__content'}
            >{`- 每个账号每月可免费兑换2次会员机会\n- 可以基本满足一般用户的需求\n- 剩余可兑换次数 ${remainingRedeemTimes} 次`}</Text>

            <FlexView column marginTop={40}>
              <Text className={'free-membership__ps'}>
                {
                  '* 此项目为爱心驱动, 开发者一人承担服务器和相关费用, 若有意赞助或提供技术支持, 请联系我~(nagua1_)\n* 谢过各位大爷~'
                }
              </Text>
            </FlexView>
            <Button
              type={'primary'}
              className={'free-membership__button'}
              disabled={remainingRedeemTimes === 0}
              onClick={this.presenter.onPressRedeem}
            >
              {'兑换'}
            </Button>
          </React.Fragment>
        )}
      </BaseView>
    );
  }
}

export default injectXeno(FreeMembershipViewModel);
