import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, CoverView, CoverImage, Text, Swiper, SwiperItem } from '@tarojs/components';
import {} from '@/types';
import { FeedStore } from '../../stores';
import { ComputedInfo } from './functional';
import {} from 'taro-ui';
import '../index.scss';
import Assets from '@/assets';

interface IProps {
  feed?: FeedStore;
}

const ApartmentInfo = ({ feed }: IProps) => {
  const { currentApartment, showDetailModal, closeApartmentDetail } = feed!;
  if (!showDetailModal) return null;
  return (
    <CoverView className={'flex detail-container'}>
      <CoverView className={'flex'} style={{ backgroundColor: 'white' }}>
        <Swiper indicatorDots indicatorColor={'#e8eaf6'} indicatorActiveColor={'#7986cb'}>
          <SwiperItem>
            <View className={'flex'}>
              <Text>{'房价: ' + currentApartment!.price}</Text>
              <Text>{'户型: ' + currentApartment!.houseType}</Text>
            </View>
          </SwiperItem>
          <SwiperItem>
            <ComputedInfo computed={currentApartment!.computed} />
          </SwiperItem>
        </Swiper>
      </CoverView>

      <CoverView className={'flex mask-container'} onClick={closeApartmentDetail}>
        <CoverImage
          src={Assets.CloseCircle}
          style={{ width: 30, height: 30, marginTop: 20, alignSelf: 'center' }}
          onClick={closeApartmentDetail}
        />
      </CoverView>
    </CoverView>
  );
};

export default inject('feed')(observer(ApartmentInfo));
