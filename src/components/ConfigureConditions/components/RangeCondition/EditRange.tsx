import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import { EditThreshold } from './EditThreshold';

export const EditRange = ({
  // range,
  max,
  min,
  // onChange,
  onChangeThreshold,
}: {
  // range: [number, number];
  max: number;
  min: number;
  // onChange: (value: [number, number]) => void;
  onChangeThreshold: (type: 'min' | 'max') => (value: string) => string;
}) => {
  const [lastMin, setLastMin] = useState<string>(min.toString());
  const [lastMax, setLastMax] = useState<string>(max.toString());
  useEffect(() => {
    if (min !== -1) setLastMin(min.toString());
  }, [min]);
  useEffect(() => {
    if (max !== -1) setLastMax(max.toString());
  }, [max]);

  return (
    <View className={'flex-row-center'} style={{ justifyContent: 'space-between' }}>
      <EditThreshold
        value={min.toString()}
        onChange={onChangeThreshold('min')}
        lastValue={lastMin}
      />
      <EditThreshold
        value={max.toString()}
        onChange={onChangeThreshold('max')}
        lastValue={lastMax}
        reverse
      />
      {/* <AtInput
        maxLength={5}
        className={'range-condition__threshold-input'}
        name={'min'}
        value={`${min}`}
        type={'number'}
        onChange={onChangeThreshold('min')}
      />
      <AtRange value={range} onChange={onChange} />
      <AtInput
        maxLength={5}
        className={'range-condition__threshold-input'}
        type={'number'}
        name={'max'}
        value={`${max}`}
        onChange={onChangeThreshold('max')}
      /> */}
    </View>
  );
};
