import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, ScrollView, Text } from '@tarojs/components';
// import {} from 'taro-ui';
import { IViewModel, IViewModalProps } from '../types';
import { ApartmentInfoPresenter } from '../presenter';
import {} from '../interactor';
import {} from '../stores';
import { injectXeno } from '@/xeno';
import { ApartmentDetail } from '@/components/ApartmentDetail';
import { BaseView, FlexView } from '@/components';
import { ApartmentList } from '@/components/ApartmentList';
import { get } from 'lodash';

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
      <BaseView style={{ flex: 1, backgroundColor: '#f5f5f5' }} isLoading={!selectedApartment}>
        <ApartmentDetail apartment={selectedApartment!} />
        <ScrollView style={{ marginTop: 15, height: '45vh' }} scrollY>
          <FlexView column>
            <ApartmentList
              apartments={apartments}
              onPressApartment={this.presenter.onPressApartment}
              selectedApartmentHouseId={get(selectedApartment, 'houseId')}
            />
          </FlexView>
        </ScrollView>
      </BaseView>
    );
  }
}

export default injectXeno(ApartmentInfoViewModel);
