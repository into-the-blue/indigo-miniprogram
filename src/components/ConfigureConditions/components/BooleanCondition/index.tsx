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
  };
  detail: TConfigBoolean;
  onEdit: () => void;
}

const Comp = ({ condition, detail: { value, title }, onEdit }: IProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  useEffect(() => {
    setChecked(condition.condition);
  }, [condition.condition]);

  const onChange = (bool: boolean) => {
    onEdit();
    setChecked(bool);
  };

  return (
    <Collapsable title={title + ':' + value[+checked]}>
      <View style={{ padding: '10px 20px' }}>
        <EditBoolean valueTitles={value} onChange={onChange} value={checked} />
      </View>
    </Collapsable>
  );
};

export { EditBoolean };
export default addWrapper(Comp);
