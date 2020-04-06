import React, { useEffect, useState } from 'react';
import { View, Switch, Text } from '@tarojs/components';
import { TSubCondition, TConfigBoolean } from '@/types';
import {} from 'taro-ui';
import addWrapper from '../conditionContainer';
import Collapsable from '@/components/Collapsable';

interface IProps {
  condition: TSubCondition & {
    type: 'boolean';
    condition: boolean;
  };
  detail: TConfigBoolean;
  onEdit: () => void;
}

export const EditBoolean = ({
  valueTitles,
  onChange,
  value,
}: {
  valueTitles: [string, string];
  onChange: (v: boolean) => void;
  value: boolean;
}) => {
  return (
    <View className={'flex-row-center'} style={{}}>
      <Text>{valueTitles[0]}</Text>
      <Switch
        onChange={(e) => onChange(e.detail.value)}
        checked={value}
        style={{ margin: '0 10px' }}
      />
      <Text>{valueTitles[1]}</Text>
    </View>
  );
};

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

export default addWrapper(Comp);
