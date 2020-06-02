import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { ISubscriptionClient } from '@/types';
import Deletable from '@/components/Deletable';
import { AtDivider } from 'taro-ui';
import Assets from '@/assets';
import classNames from 'classnames';

interface IProps {
  subscription: ISubscriptionClient;
  onPress: () => void;
  onDelete: () => void;
  onPressMore: () => void;
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

const SubscriptionCard = ({ subscription, onDelete, onPressMore, onPress }: IProps) => {
  return (
    <Deletable className={'subscription-card__wrapper'} onDelete={onDelete}>
      <View
        className={'subscription-card__container'}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onPress();
        }}
      >
        <View className={'flex-row-center'} style={{ justifyContent: 'space-between' }}>
          <Text
            className={classNames('subscription-card__address', {
              'subscription-card__address-long': subscription.address.length > 15,
            })}
          >
            {subscription.address}
          </Text>
          <Image
            src={Assets.More}
            className={'subscription-card__more-button'}
            onClick={e => {
              e.stopPropagation();
              onPressMore();
            }}
          />
        </View>
        <AtDivider height={20} />
        <Info leftText={'条件'} rightText={subscription.conditions.length} />
        <Info leftText={'推送数量'} rightText={subscription.numOfNotificationRecords} />
        <Info leftText={'热度'} rightText={subscription.popuparity} />
      </View>
    </Deletable>
  );
};

export default SubscriptionCard;
