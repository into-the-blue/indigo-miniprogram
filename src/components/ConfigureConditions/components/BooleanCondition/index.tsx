import React, { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import { TSubCondition, TConfigBoolean } from '@/types';
import {} from 'taro-ui';
import addWrapper from '../conditionContainer';
import Collapsable from '@/components/Collapsable';
import { EditBoolean } from './EditBoolean';

interface IProps {
  condition: TSubCondition & {
    type: 'boolean';
    condition: boolean;
    value: [string, string];
  };
  detail: TConfigBoolean;
  onEdit: () => void;
  updateCondition: (condition: boolean) => void;
}

const Comp = ({ condition, updateCondition, detail: { title }, onEdit }: IProps) => {
  const onChange = (bool: boolean) => {
    onEdit();
    updateCondition(bool);
  };

  return (
    <Collapsable title={title + ':' + condition.value[+condition.condition]}>
      <View style={{ padding: '10px 20px' }}>
        <EditBoolean
          valueTitles={condition.value}
          onChange={onChange}
          value={condition.condition}
        />
      </View>
    </Collapsable>
  );
};

export { EditBoolean };
export default addWrapper(Comp);
