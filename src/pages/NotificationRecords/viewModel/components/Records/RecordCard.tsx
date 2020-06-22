import React from 'react';
import { View } from '@tarojs/components';
import { ISubscriptionNotificationRecordClient } from '@/types';
import './styles.scss';
import classNames from 'classnames';
import { ApartmentDetail } from '@/components/ApartmentDetail';

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
        <ApartmentDetail
          apartment={apartment as any}
          additionalInfo={[{ title: '距离', content: distance.toFixed(0) + '米' }]}
        />
      </View>
    </View>
  );
};
