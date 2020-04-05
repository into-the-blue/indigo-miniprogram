import React, { useState, useMemo, useEffect } from 'react';
import { View, Radio } from '@tarojs/components';
import { TSubCondition } from '@/types';
import {} from '@tarojs/taro';
import { CONFIGURABLE_KEYS } from '../helper';
import { EditBoolean } from './BooleanCondition';
import { EditRange } from './RangeCondition';

interface IProps {
  onChooseCondition: (condition: TSubCondition) => void;
}

const Comp = ({ onChooseCondition }: IProps) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(false);

  const [rangeValue, setRangeValue] = useState<[number, number] | null>(null);
  const [rangeThreshold, setRangeThreshold] = useState<[number, number] | null>(null);

  const selected = useMemo(() => {
    return CONFIGURABLE_KEYS.find(o => o.key === selectedKey);
  }, [selectedKey]);

  useEffect(() => {
    if (!selected) return;
    if (selected.type === 'range') {
      setRangeThreshold(selected.condition);
      setRangeValue(selected.condition);
    }
  }, [selected]);

  const onChangeRangeThreshold = (type: 'min' | 'max') => (v: string) => {
    v = v.replace(/\D/g, '');
    const _value = +v;
    const nextThreshold: [number, number] = rangeThreshold!.slice() as [number, number];
    if (type === 'min') {
      nextThreshold[0] = _value;
      if (_value > rangeValue![0]) {
        setRangeValue([_value, rangeValue![1]]);
      }
    }
    if (type === 'max') {
      nextThreshold[1] = _value;
      if (_value < rangeValue![1]) {
        setRangeValue([rangeValue![0], _value]);
      }
    }
    setRangeThreshold(nextThreshold);
    return _value.toString();
  };
  return (
    <View>
      {!selectedKey && (
        <View style={{ flexWrap: 'wrap', flexDirection: 'column', display: 'flex' }}>
          {CONFIGURABLE_KEYS.map(item => (
            <Radio
              key={item.key}
              value={item.key}
              onClick={_ => setSelectedKey(item.key)}
              checked={selectedKey === item.key}
              style={{ margin: '2px 0' }}
            >
              {item.title}
            </Radio>
          ))}
        </View>
      )}
      {selected && (
        <View>
          {selected.type === 'boolean' && (
            <EditBoolean valueTitles={selected.condition} value={checked} onChange={setChecked} />
          )}
          {selected.type === 'range' && rangeValue && (
            <EditRange
              range={rangeValue!}
              max={rangeThreshold![1]}
              min={rangeThreshold![0]}
              onChange={setRangeValue}
              onChangeThreshold={onChangeRangeThreshold}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default Comp;
