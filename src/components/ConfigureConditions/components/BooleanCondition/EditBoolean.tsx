import React from 'react';
import { View, Switch } from '@tarojs/components';
import { Text } from '@/components';

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
        onChange={e => onChange(e.detail.value)}
        checked={value}
        style={{ margin: '0 10px' }}
      />
      <Text>{valueTitles[1]}</Text>
    </View>
  );
};
