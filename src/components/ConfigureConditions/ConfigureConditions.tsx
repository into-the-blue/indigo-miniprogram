import React from 'react';
import { TSubCondition, TConfigRange, TConfigBoolean } from '@/types';
import { View } from '@tarojs/components';
import ChooseCondition from './components/ChooseCondition';
import BooleanCondition from './components/BooleanCondition';
import RangeCondition from './components/RangeCondition';
import './styles.scss';
import { EditSubscriptionStore } from '@/store';
import { observer, inject } from 'mobx-react';

interface IProps {
  editSubscriptionStore?: EditSubscriptionStore;
}

const ConfigureConditions = ({ editSubscriptionStore, }: IProps) => {
  const {
    conditions,
    addCondition,
    availableConfigKeys,
    getDetailedCondition,
    deleteCondition,
    setEdited,
    updateSingleCondition,
  } = editSubscriptionStore!;
  const onEdit = (error?: boolean) => {
    setEdited(error);
  };

  const onChooseCondition = (condition: TSubCondition) => {
    onEdit();
    addCondition(condition);
  };

  const onUpdateCondition = (idx: number) => (condition: boolean | [number, number]) => {
    updateSingleCondition(idx, condition);
  };
  return (
    <View>
      {conditions.map((condition, idx) => {
        if (condition.type === 'boolean') {
          return (
            <BooleanCondition
              key={'cc' + idx}
              onEdit={onEdit}
              onDeleteCondition={() => deleteCondition(idx)}
              condition={condition}
              detail={getDetailedCondition(condition.key) as TConfigBoolean}
              updateCondition={onUpdateCondition(idx)}
            />
          );
        }
        if (condition.type === 'range') {
          return (
            <RangeCondition
              key={'cc' + idx}
              onEdit={onEdit}
              onDeleteCondition={() => deleteCondition(idx)}
              condition={condition}
              detail={getDetailedCondition(condition.key) as TConfigRange}
              updateCondition={onUpdateCondition(idx)}
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
