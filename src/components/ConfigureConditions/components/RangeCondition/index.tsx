import React, { useState, useEffect } from 'react';
import {} from '@tarojs/components';
import { TSubCondition, TConfigRange } from '@/types';
import {} from 'taro-ui';
import addContainer from '../conditionContainer';
import './styles.scss';
import Collapsable from '@/components/Collapsable';
import { EditRange } from './EditRange';
import {
  convertStringToNumber,
  cvtRangeToTitle,
  calNextThreshold,
  isInvalidThreshold,
} from './helper';

interface IProps {
  condition: TSubCondition & {
    type: 'range';
    condition: [number | -1, number | -1];
    value?: [number, number];
  };
  detail: TConfigRange;
  onEdit: (hasError?: boolean) => void;
  updateCondition: (value: [number, number]) => void;
}
const RangeCondition = ({ condition, onEdit, updateCondition, detail: { title } }: IProps) => {
  const [rangeThreshold, setRangeThreshold] = useState<[number, number] | null>(null);
  const [invalidThreshold, setInvalidThreshold] = useState<[boolean, boolean]>([false, false]);

  useEffect(() => {
    const hasError = !!invalidThreshold.filter(o => o).length;
    if (hasError) return;
    setRangeThreshold(condition.condition);
  }, [condition.condition, invalidThreshold]);

  const onChangeRangeThreshold = (type: 'min' | 'max') => (v: string) => {
    const _value = convertStringToNumber(v);
    const nextThreshold: [number, number] = calNextThreshold(type, rangeThreshold!, _value);
    const invalid = isInvalidThreshold(type, nextThreshold);
    const hasError = !!invalid.filter(o => o).length;
    onEdit(hasError);
    setRangeThreshold(nextThreshold);
    setInvalidThreshold(invalid);
    if (!hasError) {
      updateCondition(nextThreshold);
    }
    return _value.toString();
  };

  return (
    <Collapsable title={title + ': ' + cvtRangeToTitle(rangeThreshold)}>
      {rangeThreshold && (
        <EditRange
          // range={rangeValue}
          // onChange={onChangeRange}
          defaultRange={condition.value!}
          max={rangeThreshold![1]}
          min={rangeThreshold![0]}
          onChangeThreshold={onChangeRangeThreshold}
          thresholdError={invalidThreshold}
        />
      )}
    </Collapsable>
  );
};

export { EditRange };
export default addContainer(RangeCondition);
