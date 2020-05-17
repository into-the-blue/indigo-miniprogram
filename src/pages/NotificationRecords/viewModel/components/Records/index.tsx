import React from 'react';
import { View } from '@tarojs/components';
import { RecordCard } from './RecordCard';
import { ISubscriptionNotificationRecordClient } from '@/types';
import './styles.scss';
import { observer } from 'mobx-react';

interface IProps {
  notificationRecords: ISubscriptionNotificationRecordClient[];
  onPressRecord: (notificationRecordId: string) => void;
  selectedRecordIds: string[];
}

export const Records = observer(
  ({ notificationRecords, onPressRecord, selectedRecordIds }: IProps) => {
    return (
      <View className={'records__container'}>
        {notificationRecords.map(record => (
          <RecordCard
            key={record.id}
            record={record}
            onPressRecord={() => onPressRecord(record.id)}
            isSelected={selectedRecordIds.includes(record.id)}
          />
        ))}
      </View>
    );
  },
);
