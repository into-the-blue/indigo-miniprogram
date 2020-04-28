import React from 'react';
import { View, Text } from '@tarojs/components';
import {} from 'mobx-react';
import {} from '@/store';
import SubscriptionCard from './SubscriptionCard';
import './styles.scss';
import { ISubscription, ISubscriptionClient } from '@/types';
import PlaceholderView from '@/components/PlaceholderView';

interface IProps {
  onPressSubscription: (sub: ISubscription) => void;
  onDelete: (subscriptionId: string, idx: number) => void;
  subscriptions: ISubscriptionClient[];
}

const UserSubscriptions = ({ subscriptions, onPressSubscription, onDelete }: IProps) => {
  return (
    <View className={'user-subscription__container'}>
      <Text className={'user-subscription__my-subs'}>{'我的订阅:'}</Text>
      <PlaceholderView
        showPlaceholder={!subscriptions.length}
        renderPlaceholder={() => {
          return (
            <View className={'user-subscription__placeholder'}>
              <Text className={'user-subscription__placeholder-text'}>{'这里空空如也...'}</Text>
            </View>
          );
        }}
      >
        {subscriptions.map((sub, idx) => {
          return (
            <SubscriptionCard
              key={sub.id!}
              subscription={sub}
              onDelete={() => onDelete(sub.id, idx)}
              onPress={() => onPressSubscription(sub)}
            />
          );
        })}
      </PlaceholderView>
    </View>
  );
};

export default UserSubscriptions;
