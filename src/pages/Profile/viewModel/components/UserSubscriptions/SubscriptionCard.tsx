import React from 'react';
import { Image } from '@tarojs/components';
import { ISubscriptionClient } from '@/types';
import Deletable from '@/components/Deletable';
import { AtDivider } from 'taro-ui';
import Assets from '@/assets';
import classNames from 'classnames';
import { FlexView, Text } from '@/components';

interface IProps {
  subscription: ISubscriptionClient;
  onPress: () => void;
  onDelete: () => void;
  onPressMore: () => void;
}

const Info = ({ leftText, rightText }: { leftText: string; rightText: string | number }) => {
  return (
    <FlexView alignItems={'center'} style={{ justifyContent: 'space-between', padding: '5px 0' }}>
      <Text className={'subscription-card__left-text'}>{leftText}</Text>
      <Text className={'subscription-card__right-text'}>{rightText}</Text>
    </FlexView>
  );
};

const SubscriptionCard = ({ subscription, onDelete, onPressMore, onPress }: IProps) => {
  return (
    <Deletable className={'subscription-card__wrapper'} onDelete={onDelete}>
      <FlexView
        concaveWhenActive
        column
        className={'subscription-card__container'}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onPress();
        }}
      >
        <FlexView alignItems={'center'} style={{ justifyContent: 'space-between' }}>
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
        </FlexView>
        <AtDivider height={20} />

        <Info leftText={'条件'} rightText={subscription.conditions.length} />
        <FlexView column style={{ position: 'relative' }}>
          {!!subscription.numOfUnreadNotificationRecords && (
            <FlexView className={'subscription-card__unread-container'}>
              <Text className={'subscription-card__unread-text strong-danger'}>
                {'New!  ' + subscription.numOfUnreadNotificationRecords}
              </Text>
            </FlexView>
          )}
          <Info leftText={'推送数量'} rightText={subscription.numOfNotificationRecords} />
        </FlexView>
        <Info leftText={'热度'} rightText={subscription.popuparity} />
      </FlexView>
    </Deletable>
  );
};

export default SubscriptionCard;
