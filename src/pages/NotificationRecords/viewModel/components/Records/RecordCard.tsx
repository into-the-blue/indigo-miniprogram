import React from 'react';
import { View, Text } from '@tarojs/components';
import { ISubscriptionNotificationRecordClient } from '@/types';
import { TextBar } from '@/components';
import './styles.scss';
import classNames from 'classnames';

interface IProps {
  record: ISubscriptionNotificationRecordClient;
}
export const RecordCard = ({ record }: IProps) => {
  const { apartment, viewed, distance } = record;
  const { price, pricePerSquareMeter, area, title, houseType } = apartment;
  return (
    <View
      className={classNames('record-card__container', {
        'record-card__container-viewed': viewed,
      })}
    >
      <Text className={'record-card__title'}>{title}</Text>
      <TextBar title={'距离'} content={distance + '米'} />
      <TextBar title={'价格'} content={price + '¥'} />
      <TextBar title={'面积'} content={area + '㎡'} />
      <TextBar title={'每平米价格'} content={pricePerSquareMeter + '¥/㎡'} />
      <TextBar title={'户型'} content={houseType} />
    </View>
  );
};
