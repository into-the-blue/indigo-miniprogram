import React, { useState } from 'react';
import { TSubCondition, TConfigRange, TConfigBoolean } from '@/types';
import { View } from '@tarojs/components';
import ChooseCondition from './components/ChooseCondition';
import BooleanCondition from './components/BooleanCondition';
import RangeCondition from './components/RangeCondition';
import Taro from '@tarojs/taro';
import './styles.scss';
import { EditSubscriptionStore, MapStore, UserStore } from '@/store';
import { observer, inject } from 'mobx-react';
import { Button } from '@/components';
import { SubscriptionClient } from '@/services/subscription';

interface IProps {
  editSubscriptionStore?: EditSubscriptionStore;
  mMap?: MapStore;
  userStore?: UserStore;
}

const ConfigureConditions = ({ editSubscriptionStore, mMap, userStore }: IProps) => {
  const {
    conditions,
    addCondition,
    availableConfigKeys,
    getDetailedCondition,
    targetInfo,
    targetStationId,
  } = editSubscriptionStore!;
  const [edited, setEdited] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const onEdit = (error?: boolean) => {
    if (typeof error === 'boolean') setHasError(error);
    if (edited) return;
    setEdited(true);
  };

  const onChooseCondition = (condition: TSubCondition) => {
    onEdit();
    addCondition(condition);
  };

  const onPressSave = async () => {
    console.warn(conditions.length, conditions.slice());
    if (!userStore!.isLoggedIn) {
      return Taro.showToast({
        title: '请先登录',
        duration: 2000,
      });
    }
    if (hasError) {
      return Taro.showToast({
        title: '条件不合法',
        duration: 2000,
      });
    }
    const coordinates = targetInfo.coordinates;
    const city = mMap!.currentCity;
    const radius = editSubscriptionStore!.radius;
    const type = editSubscriptionStore!.targetType;
    const payload =
      type === 'metroStation'
        ? { stationId: targetStationId!, type }
        : { address: targetInfo.address, type };

    const body = {
      coordinates,
      city,
      radius,
      conditions,
      ...payload,
    };
    try {
      const { success, message } = await SubscriptionClient.addSubscription(body);
      if (!success) {
        console.warn(message);
        return;
      }
      Taro.showToast({
        title: '订阅成功',
        icon: 'success',
        duration: 2000,
      });
      Taro.navigateBack();
      setTimeout(editSubscriptionStore!.resetStore, 0);
    } catch (err) {
      console.warn('addSubscription', err);
      Taro.showToast({
        title: '前方拥挤...',
        duration: 2000,
      });
    }
  };

  return (
    <View>
      {edited && <Button onClick={onPressSave}>{'保存'}</Button>}
      {conditions.map((condition, idx) => {
        if (condition.type === 'boolean') {
          return (
            <BooleanCondition
              key={'cc' + idx}
              onEdit={onEdit}
              onDeleteCondition={() => {}}
              condition={condition}
              detail={getDetailedCondition(condition.key) as TConfigBoolean}
            />
          );
        }
        if (condition.type === 'range') {
          return (
            <RangeCondition
              key={'cc' + idx}
              onEdit={onEdit}
              onDeleteCondition={() => {}}
              condition={condition}
              detail={getDetailedCondition(condition.key) as TConfigRange}
            />
          );
        }
        return null;
      })}
      <ChooseCondition
        onChooseCondition={onChooseCondition}
        configurableKeys={availableConfigKeys}
      />
    </View>
  );
};

export default inject('editSubscriptionStore', 'mMap', 'userStore')(observer(ConfigureConditions));
