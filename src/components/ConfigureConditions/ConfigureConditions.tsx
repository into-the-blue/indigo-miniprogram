import React, { useState, useEffect } from 'react';
import { TSubCondition } from '@/types';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import ChooseCondition from './components/ChooseCondition';
import BooleanCondition from './components/BooleanCondition';
import RangeCondition from './components/RangeCondition';

interface IProps {
  initialConditions?: TSubCondition[];
}

const ConfigureConditions = ({ initialConditions }: IProps) => {
  const [conditions, setConditions] = useState<TSubCondition[]>([]);
  useEffect(() => {
    if (initialConditions)
      setConditions(
        initialConditions.map(o => ({
          ...o,
          isEditing: false,
        })),
      );
  }, [initialConditions]);

  const onChooseCondition = (condition: TSubCondition) => {
    setConditions(conditions.concat(condition));
  };
  return (
    <View>
      {conditions.map(condition => {
        if (condition.type === 'boolean') {
          return (
            <BooleanCondition
              onDeleteCondition={() => {}}
              condition={condition}
              value={['1', '2']}
            />
          );
        }
        if (condition.type === 'range') {
          return (
            <RangeCondition onDeleteCondition={() => {}} condition={condition} value={[0, 1000]} />
          );
        }
        return null;
      })}
      <ChooseCondition onChooseCondition={onChooseCondition} />
    </View>
  );
};

export default ConfigureConditions;
