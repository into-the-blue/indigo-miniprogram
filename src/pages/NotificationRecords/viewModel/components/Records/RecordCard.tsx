import React from 'react';
import { View, Text, Swiper, SwiperItem } from '@tarojs/components';
import { ISubscriptionNotificationRecordClient } from '@/types';
import { TextBar, ComputedInfo } from '@/components';
import './styles.scss';
import classNames from 'classnames';
import { ApartmentInfo } from '@/components/ApartmentInfo';

interface IProps {
  record: ISubscriptionNotificationRecordClient;
  onPressRecord: () => void;
  isSelected: boolean;
}
export const RecordCard = ({ record, onPressRecord, isSelected }: IProps) => {
  const { apartment, viewed, distance } = record;
  return (
    <View
      onClick={onPressRecord}
      className={classNames('record-card__container', {
        'record-card__container-viewed': viewed && !isSelected,
      })}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        className={classNames({
          'record-card__selected': isSelected,
        })}
      >
        <Swiper indicatorDots style={{ height: 250 }}>
          <SwiperItem>
            <ApartmentInfo
              apartment={apartment as any}
              additionalInfo={[{ title: '距离', content: distance + 'm' }]}
            />
          </SwiperItem>
          <SwiperItem>
            <ComputedInfo computed={apartment.computed} />
          </SwiperItem>
        </Swiper>
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>
          <Text className={'record-card__title'}>{title}</Text>
          {isApartment(tags) && (
            <AtTag className={'record-card__tag'} active>
              {'公寓'}
            </AtTag>
          )}
        </View>
        <TextBar title={'距离'} content={distance + '米'} />
        <TextBar title={'价格'} content={price + '¥'} />
        <TextBar title={'面积'} content={area + '㎡'} />
        <TextBar title={'每平米价格'} content={pricePerSquareMeter + '¥/㎡'} />
        <TextBar title={'户型'} content={houseType} /> */}
      </View>
    </View>
  );
};
