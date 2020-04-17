import React, { useState } from 'react';
import { TSubCondition, TConfigRange, TConfigBoolean } from '@/types';
import { View } from '@tarojs/components';
import ChooseCondition from './components/ChooseCondition';
import BooleanCondition from './components/BooleanCondition';
import RangeCondition from './components/RangeCondition';
import Taro from '@tarojs/taro';
import './styles.scss';
import { EditSubscriptionStore } from '@/store';
import { observer, inject } from 'mobx-react';
import { Button } from '@/components';

interface IProps {
  editSubscriptionStore?: EditSubscriptionStore;
}

const ConfigureConditions = ({ editSubscriptionStore }: IProps) => {
  const {
    conditions,
    addCondition,
    availableConfigKeys,
    getDetailedCondition,
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

  const onPressSave = () => {
    console.warn(conditions.length, conditions.slice());
    if (hasError) {
      return Taro.showToast({
        title: '条件不合法',
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

export default inject('editSubscriptionStore')(observer(ConfigureConditions));
