import React from 'react';
import { View } from '@tarojs/components';
import { RecordCard } from './RecordCard';
import { ISubscriptionNotificationRecordClient } from '@/types';
import './styles.scss'

interface IProps {
  notificationRecords: ISubscriptionNotificationRecordClient[];
}

export const Records = ({ notificationRecords }: IProps) => {
  return (
    <View className={'records__container'}>
      {notificationRecords.map(record => (
        <RecordCard key={record.id} record={record} />
      ))}
    </View>
  );
};
