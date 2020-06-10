import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { View, Map, CoverImage } from '@tarojs/components';
import { IViewModel, IViewModelProps } from '../types';
import { FeedPresenter } from '../presenter';
import classNames from 'classnames';
import FocusedLocationConsole from './components/FocusedLocationConsole';
import { SearchBar } from './components/SearchBar';
import { Banner } from './components/Banner';
import Assets from '@/assets';
import { AtMessage } from 'taro-ui';
import './index.scss';
import { injectXeno } from '@/xeno';
import { AvailableCities } from './components/AvailableCities';

@inject('global', 'feed', 'mMap')
@observer
class FeedViewModel extends Component<IViewModelProps> implements IViewModel {
  presenter: FeedPresenter;

  constructor(props: IViewModelProps) {
    super(props);
    this.presenter = this.props.buildPresenter(this);
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  componentWillUnmount() {
    this.presenter.componentWillUnmount();
  }

  get getProps() {
    return this.props;
  }

  render() {
    const { showApartmentListModal } = this.props.feed!;
    const {
      currentCoordinate,
      setting,
      markers,
      scale,
      mapDragged,
      currentApartments,
      cityActionSheetVisible,
      dismissCityActionSheet,
      availableCities,
      currentCity,
      showCityActionSheet,
      isSearchBarOpen,
      openSearchBar,
      closeSearchBar,
    } = this.props.mMap;
    return (
      <View className={'page-container'}>
        <AtMessage />
        <Banner />
        <View style={{ display: 'flex', position: 'relative', flex: 1 }}>
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
                longitude={currentCoordinate[0]}
                latitude={currentCoordinate[1]}
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
          <SearchBar
            isSearchBarOpen={isSearchBarOpen}
            openSearchBar={openSearchBar}
            closeSearchBar={closeSearchBar}
          />
          <AvailableCities
            availableCities={availableCities}
            isOpen={cityActionSheetVisible}
            dismissActionSheet={dismissCityActionSheet}
            onSelectCity={this.presenter.onSelectCity}
            showActionSheet={showCityActionSheet}
            currentCity={currentCity}
            isSearchBarOpen={isSearchBarOpen}
          />
        </View>
      </View>
    );
  }
}

export default injectXeno(FeedViewModel);
