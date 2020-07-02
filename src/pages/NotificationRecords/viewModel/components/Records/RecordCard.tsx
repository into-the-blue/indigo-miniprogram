import React from 'react';
import { ISubscriptionNotificationRecordClient } from '@/types';
import './styles.scss';
import classNames from 'classnames';
import { ApartmentDetail } from '@/components/ApartmentDetail';
import { FlexView } from '@/components';

interface IProps {
  record: ISubscriptionNotificationRecordClient;
  onPressRecord: () => void;
  isSelected: boolean;
}
export const RecordCard = ({ record, onPressRecord, isSelected }: IProps) => {
  const { apartment, viewed, distance } = record;
  return (
    <FlexView
      column
      onClick={onPressRecord}
      className={classNames('record-card__container', {
        // 'record-card__container-viewed': viewed && !isSelected,
      })}
    >
      <ApartmentDetail
        inset={isSelected}
        apartment={apartment as any}
        additionalInfo={[{ title: '距离', content: distance.toFixed(0) + '米' }]}
      />
    </FlexView>
  );
};
