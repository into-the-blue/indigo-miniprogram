import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, CoverView, CoverImage, Text, Swiper, SwiperItem } from '@tarojs/components';
import {} from '@/types';
import { FeedStore } from '@/stores';
import { ComputedInfo } from '@/components';
import {} from 'taro-ui';
import './styles.scss';
import Assets from '@/assets';
import { ApartmentInfo } from '@/components/ApartmentInfo';

interface IProps {
  feed: FeedStore;
}

export const ApartmentInfoModal = observer(({ feed }: IProps) => {
  const { currentApartment, showDetailModal, closeApartmentDetail } = feed!;
  if (!showDetailModal) return null;
  return (
    <CoverView className={'flex apartment-info__container'}>
      <CoverView className={'flex'} style={{ backgroundColor: 'white' }}>
        <Swiper
          indicatorDots
          indicatorColor={'#e8eaf6'}
          indicatorActiveColor={'#7986cb'}
          style={{ height: '50vh' }}
        >
          <SwiperItem>
            <ApartmentInfo apartment={currentApartment!} />
          </SwiperItem>
          <SwiperItem>
            <ComputedInfo computed={currentApartment!.computed} />
          </SwiperItem>
        </Swiper>
      </CoverView>

      <CoverView className={'flex apartment-info__mask-container'} onClick={closeApartmentDetail}>
        <CoverImage
          src={Assets.CloseCircle}
          style={{ width: 30, height: 30, marginTop: 20, alignSelf: 'center' }}
          onClick={closeApartmentDetail}
        />
      </CoverView>
    </CoverView>
  );
});