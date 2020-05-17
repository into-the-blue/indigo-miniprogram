import React from 'react';
import { View, Text } from '@tarojs/components';
import { ISubscriptionNotificationRecordClient } from '@/types';
import { TextBar } from '@/components';
import './styles.scss';
import classNames from 'classnames';
import { AtTag } from 'taro-ui';
import { isApartment } from '@/utils';

interface IProps {
  record: ISubscriptionNotificationRecordClient;
  onPressRecord: () => void;
  isSelected: boolean;
}
export const RecordCard = ({ record, onPressRecord, isSelected }: IProps) => {
  const { apartment, viewed, distance } = record;
  const { price, pricePerSquareMeter, area, title, houseType, tags } = apartment;
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>
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
        <TextBar title={'户型'} content={houseType} />
      </View>
    </View>
  );
};
