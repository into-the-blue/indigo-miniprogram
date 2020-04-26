import React from 'react';
import { View } from '@tarojs/components';
import { inject, observer } from 'mobx-react';
import { SubscriptionStore } from '@/store';
import SubscriptionCard from './SubscriptionCard';
import './styles.scss';
import { ISubscription } from '@/types';

interface IProps {
  subscriptionStore?: SubscriptionStore;
  onPressSubscription: (sub: ISubscription) => void;
}

const UserSubscriptions = ({ subscriptionStore, onPressSubscription }: IProps) => {
  const { userSubscriptions } = subscriptionStore!;
  return (
    <View className={'user-subscription__container'}>
      {userSubscriptions.map(sub => {
        return (
          <SubscriptionCard
            key={sub.id!}
            subscription={sub}
            onPress={() => onPressSubscription(sub)}
          />
        );
      })}
    </View>
  );
};

export default inject('subscriptionStore')(observer(UserSubscriptions));
