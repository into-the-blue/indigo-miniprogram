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
  onPressSave: (hasError: boolean) => void;
}

const ConfigureConditions = ({ editSubscriptionStore, onPressSave }: IProps) => {
  const {
    conditions,
    addCondition,
    availableConfigKeys,
    getDetailedCondition,
    deleteCondition,
    setEdited,
  } = editSubscriptionStore!;
  const onEdit = (error?: boolean) => {
    setEdited(error);
  };

  const onChooseCondition = (condition: TSubCondition) => {
    onEdit();
    addCondition(condition);
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
