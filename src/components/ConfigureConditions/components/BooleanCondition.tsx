import React, { useEffect, useState } from 'react';
import { View, Switch, Text } from '@tarojs/components';
import { TSubCondition } from '@/types';
import {} from 'taro-ui';
import addWrapper from './conditionContainer';

interface IProps {
  condition: TSubCondition & {
    type: 'boolean';
    condition: boolean;
  };
  value: [string, string];
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
    <View className={'flex-row-center'}>
      <Text>{valueTitles[0]}</Text>
      <Switch onChange={e => onChange(e.detail.value)} checked={value} />
      <Text>{valueTitles[1]}</Text>
    </View>
  );
};

const Comp = ({ condition, value }: IProps) => {
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
