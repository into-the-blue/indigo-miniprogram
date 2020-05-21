import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { View, Map, CoverImage } from '@tarojs/components';
import { IViewModel } from '../types';
import { FeedPresenter } from '../presenter';
import { FeedStore } from '../stores';
import { GlobalStore, MapStore } from '@/stores';
import classNames from 'classnames';
import FocusedLocationConsole from './components/FocusedLocationConsole';
import Assets from '@/assets';
import { AtMessage } from 'taro-ui';
import './index.scss';

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
  render() {
    const {showApartmentListModal } = this.props.feed!;
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
        <AtMessage />
        <View style={{ display: 'flex', flex: 1 }}>
          {currentCoordinate && (
            <View
              className={classNames('flex', {
                'map-container': showApartmentListModal,
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
          {mapDragged && !showApartmentListModal && (
            <CoverImage className={'map-pin'} src={Assets.CenterPin} />
          )}
          <FocusedLocationConsole
            mMap={this.props.mMap}
            showApartmentList={showApartmentListModal}
            // currentApartment={currentApartment}
            apartments={currentApartments}
            onPressList={this.presenter.showApartmentList}
            onPressSubscribe={this.presenter.goToSubscription}
            onPressApartment={this.presenter.onPressApartment}
          />
        </View>
      </View>
    );
  }
}

export default FeedViewModel;
