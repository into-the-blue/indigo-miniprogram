import React, { useState } from 'react';
import { TSubCondition, TConfigRange, TConfigBoolean } from '@/types';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import ChooseCondition from './components/ChooseCondition';
import BooleanCondition from './components/BooleanCondition';
import RangeCondition from './components/RangeCondition';
import './styles.scss';
import { SubscriptionStore, getStores } from '@/store';
import { observer, inject } from 'mobx-react';
import { Button } from '@/components';

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
  const [edited, setEdited] = useState<boolean>(false);

  const onEdit = () => {
    if (edited) return;
    setEdited(true);
  };

  const onChooseCondition = (condition: TSubCondition) => {
    onEdit();
    addCondition(condition);
  };

  return (
    <View>
      {edited && <Button>{'保存'}</Button>}
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

export default inject('subscriptionStore')(observer(ConfigureConditions));
