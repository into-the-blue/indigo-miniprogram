import React from 'react';
import { TSubCondition, TConfigRange, TConfigBoolean } from '@/types';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import ChooseCondition from './components/ChooseCondition';
import BooleanCondition from './components/BooleanCondition';
import RangeCondition from './components/RangeCondition';
import './styles.scss';
import { SubscriptionStore, getStores } from '@/store';
import { observer, inject } from 'mobx-react';

interface IProps {
  subscriptionStore?: SubscriptionStore;
}

const ConfigureConditions = ({ subscriptionStore }: IProps) => {
  const {
    conditions,
    addCondition,
    availableConfigKeys,
    getDetailedCondition,
  } = subscriptionStore!;

  const onChooseCondition = (condition: TSubCondition) => {
    addCondition(condition);
  };
  return (
    <View>
      {conditions.map((condition, idx) => {
        if (condition.type === 'boolean') {
          return (
            <BooleanCondition
              key={'cc' + idx}
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

export default inject('subscriptionStore')(observer(ConfigureConditions));
