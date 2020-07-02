import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Map, CoverImage, Button } from '@tarojs/components';
import { IViewModel, IViewModelProps } from '../types';
import { FeedPresenter } from '../presenter';
import FocusedLocationConsole from './components/FocusedLocationConsole';
import { SearchBar } from './components/SearchBar';
import { Banner } from './components/Banner';
import Assets from '@/assets';
import { AtMessage } from 'taro-ui';
import './index.scss';
import { injectXeno } from '@/xeno';
import { AvailableCities } from './components/AvailableCities';
import { FlexView, Text } from '@/components';

@inject('global', 'feed', 'mMap', 'userStore')
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
    const {
      showApartmentListModal,
      locationAuthorized,
      apartmentsNearby,
      isQueryingAptsNearby,
    } = this.props.feed!;
    const {
      currentCoordinate,
      setting,
      markers,
      scale,
      mapDragged,
      cityActionSheetVisible,
      dismissCityActionSheet,
      availableCities,
      currentCity,
    } = this.props.mMap;
    return (
      <FlexView column style={{ height: '100vh', width: '100%' }}>
        <FlexView column style={{ flex: 1, position: 'relative' }}>
          {/* <FlexView
            className={classNames({
              'blur-container': showApartmentListModal,
            })}
          > */}
          <Banner />
          {/* {noticeMessage && (
            <FlexView style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
              <AtNoticebar marquee close>
                {noticeMessage}
              </AtNoticebar>
            </FlexView>
          )} */}
          {/* </FlexView> */}
          <FlexView
            // className={classNames({
            //   'blur-container': showApartmentListModal,
            // })}
            column
            style={{ position: 'relative', flex: 1 }}
          >
            {!locationAuthorized && (
              <FlexView column style={{ alignItems: 'center', marginTop: 80 }}>
                <Text style={{ textAlign: 'center' }}>
                  {'We need access to your location to provide service'}
                </Text>

                <Button type={'primary'} onClick={this.presenter.requestLocationPermission}>
                  {'Grant'}
                </Button>
              </FlexView>
            )}
            {currentCoordinate && (
              <FlexView style={{ flex: 1 }}>
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
              </FlexView>
            )}
            {mapDragged && !showApartmentListModal && !cityActionSheetVisible && (
              <CoverImage
                onClick={e => {
                  e.preventDefault();
                }}
                className={'map-pin'}
                src={Assets.CenterPin}
              />
            )}
            {locationAuthorized && <SearchBar onPress={this.presenter.onPressSearch} />}
            <FocusedLocationConsole
              mMap={this.props.mMap}
              // showApartmentList={showApartmentListModal}
              onPressList={this.presenter.showApartmentList}
              onPressSubscribe={this.presenter.goToSubscription}
              isQueryingAptsNearby={isQueryingAptsNearby}
              numOfApartmentsNearby={
                apartmentsNearby ? apartmentsNearby.apartments.length : undefined
              }
              showAptsNearby={this.presenter.showAptsNearby}
              queryAndShowAptsNearby={this.presenter.queryAndShowAptsNearby}
            />
            {locationAuthorized && (
              <AvailableCities
                availableCities={availableCities}
                isOpen={cityActionSheetVisible}
                dismissActionSheet={dismissCityActionSheet}
                onSelectCity={this.presenter.onSelectCity}
                showActionSheet={this.presenter.onPressShowCityList}
                currentCity={currentCity}
              />
            )}
          </FlexView>
          {/* {showApartmentListModal && (
            <FlexView
              onClick={this.presenter.showApartmentList}
              style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
            />
          )} */}
        </FlexView>
        <AtMessage />
      </FlexView>
    );
  }
}

export default injectXeno(FeedViewModel);
