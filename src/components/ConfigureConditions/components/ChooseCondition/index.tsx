import React, { useState, useMemo, useEffect } from 'react';
import { View, Radio, Text } from '@tarojs/components';
import { TSubCondition, TConfigBoolean, TConfigRange } from '@/types';
import {} from '@tarojs/taro';
import { EditBoolean } from '../BooleanCondition';
import { EditRange } from '../RangeCondition';
import { Button } from '@/components';

interface IProps {
  onChooseCondition: (condition: TSubCondition) => void;
  configurableKeys: (TConfigBoolean | TConfigRange)[];
}

const Comp = ({ onChooseCondition, configurableKeys }: IProps) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(false);

  const [rangeValue, setRangeValue] = useState<[number, number]>([0, 100]);
  const [rangeThreshold, setRangeThreshold] = useState<[number, number] | null>(null);

  const selected = useMemo(() => {
    return configurableKeys.find((o) => o.key === selectedKey);
  }, [selectedKey, configurableKeys]);

  useEffect(() => {
    if (!selected) return;
    if (selected.type === 'range') {
      setRangeThreshold(selected.value);
    }
  }, [selected, setRangeThreshold]);

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
    setRangeThreshold(nextThreshold);
    return _value.toString();
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

  const isBoolean = selected?.type === 'boolean';
  const isRange = selected?.type === 'range';
  const hasKeyToConfigure = !!configurableKeys.length;

  const resetState = () => {
    setChecked(false);
    setRangeThreshold(null);
    setSelectedKey(null);
  };

  const onConfirmCondition = () => {
    const condition: any = {
      type: selected!.type,
      key: selected!.key,
      condition: isRange ? rangeValue : checked,
      value: isRange ? rangeThreshold! : selected!.value,
    };
    onChooseCondition(condition);
    resetState();
  };
  if (!hasKeyToConfigure) return null;
  return (
    <View className={'config-condition__choose-condition'}>
      {!selectedKey && (
        <View style={{ flexWrap: 'wrap', flexDirection: 'column', display: 'flex' }}>
          <Text>{'添加订阅条件'}</Text>
          {configurableKeys.map((item) => (
            <Radio
              key={item.key}
              value={item.key}
              onClick={(_) => setSelectedKey(item.key)}
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
          <View
            className={'flex-row-center'}
            style={{ justifyContent: 'space-between', marginBottom: '10px' }}
          >
            <View className={'flex-row-center'}>
              <Text style={{ marginRight: '6px' }}>{selected.title + ': '}</Text>
              {isRange && <Text>{currentRange.join(' - ')}</Text>}
              {isBoolean && <Text>{selected.value[+checked]}</Text>}
            </View>
            <Button onClick={onConfirmCondition}>{'确认'}</Button>
          </View>
          {isBoolean && (
            <EditBoolean
              valueTitles={selected.value as [string, string]}
              value={checked}
              onChange={setChecked}
            />
          )}
          {isRange && rangeThreshold && (
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
