import React from 'react';
import { observer, inject } from 'mobx-react';
import { ScrollView } from '@tarojs/components';
import { AtMessage } from 'taro-ui';
import { IViewModel, IViewModalProps } from '../types';
import { ApartmentInfoPresenter } from '../presenter';
import {} from '../interactor';
import {} from '../stores';
import { injectXeno } from '@/xeno';
import { ApartmentDetail } from '@/components/ApartmentDetail';
import { BaseView, FlexView } from '@/components';
import { ApartmentList } from '@/components/ApartmentList';
import get from 'lodash.get';
import './styles.scss';

@inject('global', 'apartmentInfoStore')
@observer
class ApartmentInfoViewModel extends React.Component<IViewModalProps> implements IViewModel {
  presenter: ApartmentInfoPresenter;

  constructor(props: IViewModalProps) {
    super(props);

    this.presenter = this.props.buildPresenter(this);
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  get getProps() {
    return this.props;
  }

  componentWillUnmount() {}

  render() {
    const { selectedApartment, apartments } = this.props.apartmentInfoStore!;
    return (
      <BaseView style={{ flex: 1 }} isLoading={!apartments.length && !selectedApartment}>
        <AtMessage />
        <FlexView style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1 }} column>
          <ApartmentDetail apartment={selectedApartment!} />
        </FlexView>
        <ScrollView className={'apt-info-page__apt-list'} scrollY>
          <ApartmentList
            apartments={apartments}
            onPressApartment={this.presenter.onPressApartment}
            selectedApartmentHouseId={get(selectedApartment, 'houseId')}
          />
        </ScrollView>
      </BaseView>
    );
  }
}

export default injectXeno(ApartmentInfoViewModel);
