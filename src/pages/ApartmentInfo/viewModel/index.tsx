import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, ScrollView, Text } from '@tarojs/components';
// import {} from 'taro-ui';
import { IViewModel, IViewModalProps } from '../types';
import { ApartmentInfoPresenter } from '../presenter';
import {} from '../interactor';
import {} from '../stores';
import { injectXeno } from '@/xeno';
import { ApartmentInfo } from '@/components/ApartmentInfo';
import { BaseView, FlexView } from '@/components';
import { ApartmentList } from '@/components/ApartmentList';

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
    const { apartment, apartments } = this.props.apartmentInfoStore!;
    return (
      <View style={{ flex: 1 }}>
        <BaseView isLoading={!apartment}>
          <ApartmentInfo apartment={apartment!} />
          <FlexView style={{ margin: '20px 5px' }}>
            <ApartmentList apartments={apartments} onPressApartment={() => {}} />
          </FlexView>
        </BaseView>
      </View>
    );
  }
}

export default injectXeno(ApartmentInfoViewModel);
