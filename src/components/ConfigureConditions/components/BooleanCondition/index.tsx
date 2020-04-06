import React, { useEffect, useState } from 'react';
import { View, Switch, Text } from '@tarojs/components';
import { TSubCondition, TConfigBoolean } from '@/types';
import {} from 'taro-ui';
import addWrapper from '../conditionContainer';

interface IProps {
  condition: TSubCondition & {
    type: 'boolean';
    condition: boolean;
  };
  detail: TConfigBoolean;
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

const Comp = ({ condition, detail: { value, title } }: IProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  useEffect(() => {
    setChecked(condition.condition);
  }, [condition.condition]);
  return (
    <View>
      <EditBoolean valueTitles={value} onChange={setChecked} value={checked} />
    </View>
  );
};

export default addWrapper(Comp);
