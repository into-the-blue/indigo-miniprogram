import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { View, Map, Image, CoverImage } from '@tarojs/components';
// import {} from 'taro-ui';
import { IViewModel } from '../types';
import { FeedPresenter } from '../presenter';
import {} from '../interactor';
import { FeedStore } from '../stores';
import { GlobalStore, MapStore } from '@/store';
import Tabbar from '@/components/Tabbar';
import classNames from 'classnames';
import ApartmentInfoModal from './components/ApartmentInfo';
import FocusedLocationConsole from './components/FocusedLocationConsole';
import Assets from '@/assets';

interface IProps {
  feed: FeedStore;
  global: GlobalStore;
  buildPresenter: (viewModel: IViewModel) => FeedPresenter;
  mMap: MapStore;
}

@inject('global', 'feed', 'mMap')
@observer
class FeedViewModel extends Component<IProps> implements IViewModel {
  presenter: FeedPresenter;

  constructor(props: IProps) {
    super(props);
    this.presenter = this.props.buildPresenter(this);
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  componentWillUnmount() {
    this.presenter.componentWillUnmount();
  }
  increment = () => {
    const { setState, count } = this.props.global;
    setState({
      count: count + 1,
    });
  };

  decrement = () => {
    const { setState, count } = this.props.global;
    setState({
      count: count - 1,
    });
  };
  render() {
    const { showDetailModal, currentApartment, showApartmentListModal } = this.props.feed!;
    const {
      currentCoordinate,
      setting,
      markers,
      scale,
      mapDragged,
      currentApartments,
    } = this.props.mMap;
    return (
      <View className={'page-container'}>
        <View style={{ display: 'flex', flex: 1 }}>
          {currentCoordinate && (
            <View
              className={classNames('flex', {
                'map-container': showDetailModal,
              })}
              style={{ flex: 1 }}
            >
              <Map
                id={'map'}
                style={{ width: '100%', height: '100%' }}
                longitude={currentCoordinate.lng}
                latitude={currentCoordinate.lat}
                setting={setting}
                scale={scale}
                // @ts-ignore
                markers={markers}
                onMarkerTap={this.presenter.onPressMarker}
                onBegin={this.presenter.onBeginDrag}
                onEnd={this.presenter.onEndDrag}
              />
            </View>
          )}
          {mapDragged && !showDetailModal && (
            <CoverImage className={'map-pin'} src={Assets.CenterPin} />
          )}
          <ApartmentInfoModal />
          <FocusedLocationConsole
            mMap={this.props.mMap}
            showApartmentList={showApartmentListModal}
            currentApartment={currentApartment}
            apartments={currentApartments}
            onPressList={this.presenter.showApartmentList}
            onPressSubscribe={this.presenter.goToSubscription}
            onPressApartment={this.presenter.onPressApartment}
          />
        </View>
        <Tabbar />
      </View>
    );
  }
}

export default FeedViewModel;
