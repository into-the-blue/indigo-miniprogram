import React from 'react';
import { View, Text } from '@tarojs/components';
import { ISubscriptionClient } from '@/types';
import Deletable from '@/components/Deletable';
import { AtDivider } from 'taro-ui';

interface IProps {
  subscription: ISubscriptionClient;
  onPress: () => void;
  onDelete: () => void;
}

const Info = ({ leftText, rightText }: { leftText: string; rightText: string | number }) => {
  return (
    <View
      className={'flex-row-center'}
      style={{ justifyContent: 'space-between', padding: '5px 0' }}
    >
      <Text className={'subscription-card__left-text'}>{leftText}</Text>
      <Text className={'subscription-card__right-text'}>{rightText}</Text>
    </View>
  );
};

const SubscriptionCard = ({ subscription, onDelete }: IProps) => {
  return (
    <Deletable onDelete={onDelete}>
      <View className={'subscription-card__container'}>
        <Text className={'subscription-card__address'}>{subscription.address}</Text>
        <AtDivider height={20} />
        <Info leftText={'条件'} rightText={subscription.conditions.length} />
        <Info leftText={'推送数量'} rightText={subscription.countOfNotifications} />
        <Info leftText={'热度'} rightText={subscription.popuparity} />
      </View>
    </Deletable>
  );
};

export default SubscriptionCard;
