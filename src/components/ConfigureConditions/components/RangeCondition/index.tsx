import React, { useState, useEffect, useMemo } from 'react';
import {} from '@tarojs/components';
import { TSubCondition, TConfigRange } from '@/types';
import {} from 'taro-ui';
import addContainer from '../conditionContainer';
import './styles.scss';
import Collapsable from '@/components/Collapsable';
import { EditRange } from './EditRange';
import { convertStringToNumber, cvtRangeToTitle, calNextThreshold } from './helper';

interface IProps {
  condition: TSubCondition & {
    type: 'range';
    condition: [number | -1, number | -1];
  };
  detail: TConfigRange;
  onEdit: () => void;
}
const RangeCondition = ({ condition, onEdit, detail: { title } }: IProps) => {
  // const [rangeValue, setRangeValue] = useState<[number, number]>([0, 100]);
  const [rangeThreshold, setRangeThreshold] = useState<[number, number] | null>(null);

  useEffect(() => {
    setRangeThreshold(condition.condition);
  }, [condition.condition]);

  const onChangeRangeThreshold = (type: 'min' | 'max') => (v: string) => {
    const _value = convertStringToNumber(v);
    const nextThreshold: [number, number] = calNextThreshold(type, rangeThreshold!, _value);
    onEdit();
    setRangeThreshold(nextThreshold);
    return _value.toString();
  };

  // const onChangeRange = (v: [number, number]) => {
  //   onEdit();
  //   setRangeValue(v);
  // };

  // const currentRange: [number, number] = useMemo(() => {
  //   if (!rangeThreshold) return [0, 0];
  //   const per = (rangeThreshold![1] - rangeThreshold![0]) / 100;
  //   return rangeValue.map(v => {
  //     if (v === 0) return rangeThreshold[0];
  //     if (v === 100) return rangeThreshold[1];
  //     return Math.round(rangeThreshold![0] + v * per);
  //   }) as [number, number];
  // }, [rangeValue, rangeThreshold]);
  return (
    <Collapsable title={title + cvtRangeToTitle(rangeThreshold)}>
      {rangeThreshold && (
        <EditRange
          // range={rangeValue}
          // onChange={onChangeRange}
          max={rangeThreshold![1]}
          min={rangeThreshold![0]}
          onChangeThreshold={onChangeRangeThreshold}
        />
      )}
    </Collapsable>
  );
};

export { EditRange };
export default addContainer(RangeCondition);
