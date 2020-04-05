import React, { useState, useEffect } from 'react';
import { View, Text, Input } from '@tarojs/components';
import { TSubCondition } from '@/types';
import { AtRange, AtInput } from 'taro-ui';
import addContainer from './conditionContainer';

interface IProps {
  condition: TSubCondition & {
    type: 'range';
    condition: [number | -1, number | -1];
  };
  value: [number, number];
}

export const EditRange = ({
  range,
  max,
  min,
  onChange,
  onChangeThreshold,
}: {
  range: [number, number];
  max: number;
  min: number;
  onChange: (value: [number, number]) => void;
  onChangeThreshold: (type: 'min' | 'max') => (value: string) => string;
}) => {
  console.warn(range, max, min);
  return (
    <View className={'flex-row-center'}>
      <AtInput name={'min'} value={`${min}`} type={'number'} onChange={onChangeThreshold('min')} />
      <AtRange value={range} min={min} max={max} onChange={onChange} />
      <AtInput type={'number'} name={'max'} value={`${max}`} onChange={onChangeThreshold('max')} />
    </View>
  );
};

const Comp = ({ condition, value }: IProps) => {
  const [rangeValue, setRangeValue] = useState<[number, number] | null>(null);
  const [rangeThreshold, setRangeThreshold] = useState<[number, number] | null>(null);

  useEffect(() => {
    setRangeValue(condition.condition);
  }, [condition.condition]);

  useEffect(() => {
    setRangeThreshold(value);
  }, [value]);

  const onChangeRangeThreshold = (type: 'min' | 'max') => (v: string) => {
    if (type === 'min') {
      setRangeThreshold([+v, rangeThreshold![1]]);
    }
    if (type === 'max') {
      setRangeThreshold([rangeThreshold![0], +v]);
    }
    return v;
  };

  return (
    <View>
      <View>
        <Text>{`${condition.key} ` + rangeValue}</Text>
        {rangeValue && (
          <EditRange
            range={rangeValue}
            onChange={setRangeValue}
            max={rangeThreshold![1]}
            min={rangeThreshold![0]}
            onChangeThreshold={onChangeRangeThreshold}
          />
        )}
      </View>
    </View>
  );
};

export default addContainer(Comp);
