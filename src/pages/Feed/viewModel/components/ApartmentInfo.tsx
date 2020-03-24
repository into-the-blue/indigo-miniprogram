import React from 'react';
import { observer, inject } from 'mobx-react';
import { View, CoverView, CoverImage, Text, Swiper } from '@tarojs/components';
import {} from '@/types';
import { FeedStore } from '../../stores';
import { ComputedInfo } from './functional';
import {} from 'taro-ui';
import '../index.scss';

const CLOSE_CIRCLE_URL = 'https://indigo.oss-cn-hangzhou.aliyuncs.com/images/close_circle.png';

interface IProps {
  feed?: FeedStore;
}

const ApartmentInfo = ({ feed }: IProps) => {
  const { currentApartment, showDetailModal, closeApartmentDetail } = feed!;
  if (!showDetailModal) return null;
  return (
    <CoverView className={'flex detail-container'}>
      <CoverView className={'flex'} style={{ backgroundColor: 'white', flexDirection: 'row' }}>
        <View className={'flex'}>
          <Text>{'房价: ' + currentApartment!.price}</Text>
          <Text>{'户型: ' + currentApartment!.houseType}</Text>
        </View>
        <ComputedInfo computed={currentApartment!.computed} />
      </CoverView>

      <CoverView className={'flex mask-container'} onClick={closeApartmentDetail}>
        <CoverImage
          src={CLOSE_CIRCLE_URL}
          style={{ width: 30, height: 30, marginTop: 20, alignSelf: 'center' }}
          onClick={closeApartmentDetail}
        />
      </CoverView>
    </CoverView>
  );
};

export default inject('feed')(observer(ApartmentInfo));
