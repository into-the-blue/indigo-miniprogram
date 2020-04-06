import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { TSubCondition, TConfigRange } from '@/types';
import { AtRange, AtInput } from 'taro-ui';
import addContainer from '../conditionContainer';
import './styles.scss';
import Assets from '@/assets';
import classNames from 'classnames';
import Collapsable from '@/components/Collapsable';

interface IProps {
  condition: TSubCondition & {
    type: 'range';
    condition: [number | -1, number | -1];
  };
  detail: TConfigRange;
  onEdit: () => void;
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
  return (
    <View className={'flex-row-center'}>
      <AtInput
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
      />
    </View>
  );
};

const RangeCondition = ({ condition, onEdit, detail: { title } }: IProps) => {
  const [collapse, setCollapse] = useState<boolean>(true);

  const [rangeValue, setRangeValue] = useState<[number, number]>([0, 100]);
  const [rangeThreshold, setRangeThreshold] = useState<[number, number] | null>(null);

  const openCloseEditor = () => {
    setCollapse(!collapse);
  };

  useEffect(() => {
    setRangeThreshold(condition.condition);
  }, [condition.condition]);

  const onChangeRangeThreshold = (type: 'min' | 'max') => (v: string) => {
    v = v.replace(/\D/g, '');
    const _value = +v;
    const nextThreshold: [number, number] = rangeThreshold!.slice() as [number, number];
    if (type === 'min') {
      nextThreshold[0] = _value;
    }
    if (type === 'max') {
      nextThreshold[1] = _value;
    }
    onEdit();
    setRangeThreshold(nextThreshold);
    return _value.toString();
  };

  const onChangeRange = (v: [number, number]) => {
    onEdit();
    setRangeValue(v);
  };

  const currentRange: [number, number] = useMemo(() => {
    if (!rangeThreshold) return [0, 0];
    const per = (rangeThreshold![1] - rangeThreshold![0]) / 100;
    return rangeValue.map((v) => {
      if (v === 0) return rangeThreshold[0];
      if (v === 100) return rangeThreshold[1];
      return Math.round(rangeThreshold![0] + v * per);
    }) as [number, number];
  }, [rangeValue, rangeThreshold]);
  return (
    <Collapsable title={title + currentRange.join(' - ')}>
      {rangeValue && rangeThreshold && (
        <EditRange
          range={rangeValue}
          onChange={onChangeRange}
          max={rangeThreshold![1]}
          min={rangeThreshold![0]}
          onChangeThreshold={onChangeRangeThreshold}
        />
      )}
    </Collapsable>
  );
};

export default addContainer(RangeCondition);
