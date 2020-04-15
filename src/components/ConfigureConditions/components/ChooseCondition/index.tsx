import React, { useState, useMemo, useEffect } from 'react';
import { View, Radio, Text } from '@tarojs/components';
import { TSubCondition, TConfigBoolean, TConfigRange } from '@/types';
import {} from '@tarojs/taro';
import { EditBoolean } from '../BooleanCondition';
import { EditRange } from '../RangeCondition';
import { Button } from '@/components';
import { convertStringToNumber, cvtRangeToTitle, calNextThreshold } from '../RangeCondition/helper';

interface IProps {
  onChooseCondition: (condition: TSubCondition) => void;
  configurableKeys: (TConfigBoolean | TConfigRange)[];
}

const Comp = ({ onChooseCondition, configurableKeys }: IProps) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(false);

  // const [rangeValue, setRangeValue] = useState<[number, number]>([0, 100]);
  const [rangeThreshold, setRangeThreshold] = useState<[number, number] | null>(null);

  const selected = useMemo(() => {
    return configurableKeys.find(o => o.key === selectedKey);
  }, [selectedKey, configurableKeys]);

  useEffect(() => {
    if (!selected) return;
    if (selected.type === 'range') {
      setRangeThreshold(selected.value);
    }
  }, [selected, setRangeThreshold]);

  const onChangeRangeThreshold = (type: 'min' | 'max') => (v: string) => {
    const _value = convertStringToNumber(v);
    const nextThreshold: [number, number] = calNextThreshold(type, rangeThreshold!, _value);
    setRangeThreshold(nextThreshold);
    return _value.toString();
  };

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
      condition: isRange ? rangeThreshold! : checked,
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
          {configurableKeys.map(item => (
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
          <View
            className={'flex-row-center'}
            style={{ justifyContent: 'space-between', marginBottom: '10px' }}
          >
            <View className={'flex-row-center'}>
              <Text style={{ marginRight: '6px' }}>{selected.title + ': '}</Text>
              {isRange && <Text>{cvtRangeToTitle(rangeThreshold)}</Text>}
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
              max={rangeThreshold![1]}
              min={rangeThreshold![0]}
              onChangeThreshold={onChangeRangeThreshold}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default Comp;
