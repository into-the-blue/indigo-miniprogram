import React, { useState } from 'react';
import { View } from '@tarojs/components';
import SubscriptionCard from './SubscriptionCard';
import './styles.scss';
import { ISubscriptionClient } from '@/types';
import PlaceholderView from '@/components/PlaceholderView';
import { AtActionSheet, AtActionSheetItem, AtModal } from 'taro-ui';
import { findItemByKeyValue } from '@/utils';
import { Text, FlexView } from '@/components';

interface IProps {
  onPressSubscription: (sub: ISubscriptionClient) => void;
  onDelete: (subscriptionId: string) => void;
  onPressEdit: (sub: ISubscriptionClient) => void;
  subscriptions: ISubscriptionClient[];
}

const UserSubscriptions = ({
  subscriptions,
  onPressSubscription,
  onDelete,
  onPressEdit,
}: IProps) => {
  const [showActionSheet, setShowActionSheet] = useState<boolean>(false);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string | null>(null);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState<boolean>(false);

  const onPressMore = (subscriptionId: string) => {
    setSelectedSubscriptionId(subscriptionId);
    setShowActionSheet(true);
  };
  const onCancel = () => {
    setShowActionSheet(false);
  };

  const onPressHistory = () => {
    onCancel();
    onPressSubscription(findItemByKeyValue(subscriptions, selectedSubscriptionId, 'id')!);
  };

  const _onPressEdit = () => {
    onCancel();
    const subscription = findItemByKeyValue(subscriptions, selectedSubscriptionId, 'id');
    onPressEdit(subscription!);
  };

  const deleteSubscription = () => {
    onCancel();
    setShowConfirmDeleteModal(true);
  };

  const dismissConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false);
  };

  const onConfirmDelete = () => {
    dismissConfirmDeleteModal();
    onDelete(selectedSubscriptionId!);
  };
  return (
    <View className={'user-subscription__container'}>
      <Text className={'user-subscription__my-subs strong'}>{`我的订阅:    ${
        !!subscriptions.length ? subscriptions.length : ''
      }`}</Text>
      <PlaceholderView
        showPlaceholder={!subscriptions.length}
        renderPlaceholder={() => {
          return (
            <FlexView neumorphism className={'user-subscription__placeholder'}>
              <Text className={'user-subscription__placeholder-text strong'}>
                {'这里空空如也...'}
              </Text>
            </FlexView>
          );
        }}
      >
        {subscriptions.map((sub, idx) => {
          return (
            <SubscriptionCard
              key={sub.id!}
              subscription={sub}
              onDelete={() => onDelete(sub.id)}
              onPress={() => onPressSubscription(sub)}
              onPressMore={() => onPressMore(sub.id)}
            />
          );
        })}
      </PlaceholderView>

      <AtActionSheet
        isOpened={showActionSheet}
        onCancel={onCancel}
        onClose={onCancel}
        cancelText={'取消'}
      >
        <AtActionSheetItem onClick={onPressHistory}>{'查看推送记录'}</AtActionSheetItem>
        <AtActionSheetItem onClick={_onPressEdit}>{'编辑'}</AtActionSheetItem>
        <AtActionSheetItem onClick={deleteSubscription}>
          <Text style={{ color: 'red' }}>{'删除'}</Text>
        </AtActionSheetItem>
      </AtActionSheet>
      <AtModal
        isOpened={showConfirmDeleteModal}
        content={'确认删除?'}
        onClose={dismissConfirmDeleteModal}
        onCancel={dismissConfirmDeleteModal}
        confirmText={'确定'}
        cancelText={'算了'}
        onConfirm={onConfirmDelete}
      />
    </View>
  );
};

export default UserSubscriptions;
