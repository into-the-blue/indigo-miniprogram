import React, { useState, useEffect } from 'react';
import { Swiper, SwiperItem, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Routes } from '@/utils/constants';
import './styles.scss';
import { UniversalService } from '@/services/universal';

interface IBanner {
  imgUrl: string;
  width: number;
  height: number;
  type: 'free_membership';
}

export const Banner = () => {
  const [banners, setBanners] = useState<IBanner[]>([]);
  useEffect(() => {
    queryBanners();
  });
  const queryBanners = () => {
    UniversalService.getBanners()
      .then(setBanners)
      .catch(err => {
        console.warn('[queryBanners]', err);
      });
  };
  const onPressBannder = (banner: IBanner) => {
    if (banner.type === 'free_membership') {
      return Taro.navigateTo({
        url: Routes.FreeMembership,
      });
    }
  };
  if (!banners.length) return null;
  return (
    <Swiper
      indicatorDots={banners.length > 1}
      circular={banners.length > 1}
      autoplay={banners.length > 1}
      className={'banner__container'}
    >
      {banners.map((item, idx) => (
        <SwiperItem onClick={() => onPressBannder(item)} key={'banner' + idx}>
          <Image style={{ objectFit: 'cover', width: '100vw', height: '30vw' }} src={item.imgUrl} />
        </SwiperItem>
      ))}
    </Swiper>
  );
};
