import React from 'react';
import { IProps, IViewModel } from '../types';
import ViewModel from '../viewModel';
import { NotificationRecordsPresenter } from '../presenter';
import { NotificationRecordsInteractor } from '../interactor';
import { getStores } from '@/stores';

class Builder extends React.Component<IProps> {
  presenter: NotificationRecordsPresenter;
  VM: JSX.Element;

  constructor(props: IProps) {
    super(props);
    const interactor = this.buildInteractor();
    const presenterBuilder = this.buildPresenter(interactor);
    this.VM = this.buildViewModel(presenterBuilder);
  }
  componentDidMount() {}
  buildInteractor = () => {
    const { notificationRecordsStore } = getStores('notificationRecordsStore');
    return new NotificationRecordsInteractor(notificationRecordsStore);
  };
  buildPresenter = (interactor: NotificationRecordsInteractor) => (viewModel: IViewModel) => {
    return new NotificationRecordsPresenter(interactor, viewModel);
  };
  buildViewModel = (buildPresenter: (viewModel: IViewModel) => NotificationRecordsPresenter) => {
    // @ts-ignore
    return <ViewModel buildPresenter={buildPresenter} />;
  };
  render() {
    return this.VM;
  }
}

export default Builder;