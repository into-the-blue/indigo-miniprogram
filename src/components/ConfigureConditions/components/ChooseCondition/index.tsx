import React, { useState, useMemo, useEffect } from 'react';
import { Radio } from '@tarojs/components';
import { TSubCondition, TConfigBoolean, TConfigRange } from '@/types';
import Taro from '@tarojs/taro';
import { EditBoolean } from '../BooleanCondition';
import { EditRange } from '../RangeCondition';
import { Button, Text } from '@/components';
import {
  convertStringToNumber,
  cvtRangeToTitle,
  calNextThreshold,
  isInvalidThreshold,
} from '../RangeCondition/helper';
import './styles.scss';
import { FlexView } from '@/components/FlexView';

interface IProps {
  onChooseCondition: (condition: TSubCondition) => void;
  configurableKeys: (TConfigBoolean | TConfigRange)[];
}

const Comp = ({ onChooseCondition, configurableKeys }: IProps) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(false);

  // const [rangeValue, setRangeValue] = useState<[number, number]>([0, 100]);
  const [rangeThreshold, setRangeThreshold] = useState<[number, number] | null>(null);
  const [invalidThreshold, setInvalidThreshold] = useState<[boolean, boolean]>([false, false]);
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
    const invalid = isInvalidThreshold(type, nextThreshold);
    setRangeThreshold(nextThreshold);
    setInvalidThreshold(invalid);
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
    if (invalidThreshold.filter(o => o).length) {
      return Taro.atMessage({
        message: '无效条件',
        type: 'warning',
      });
    }
    const condition: any = {
      type: selected!.type,
      key: selected!.key,
      condition: isRange ? rangeThreshold! : checked,
      value: selected!.value,
    };
    onChooseCondition(condition);
    resetState();
  };
  if (!hasKeyToConfigure) return null;
  return (
    <FlexView className={'choose-condition__container'} column>
      {!selectedKey && (
        <FlexView style={{ flexWrap: 'wrap', flexDirection: 'column', display: 'flex' }}>
          <Text>{'添加订阅条件'}</Text>
          {configurableKeys.map(item => (
            <Radio
              key={item.key}
              value={item.key}
              onClick={_ => setSelectedKey(item.key)}
              checked={selectedKey === item.key}
              style={{ margin: '2px 0' }}
              className={'choose-condition__radio'}
            >
              {item.title}
            </Radio>
          ))}
        </FlexView>
      )}
      {selected && (
        <FlexView column>
          <FlexView
            alignItems={'center'}
            justifyContent={'space-between'}
            style={{ marginBottom: '10px' }}
          >
            <FlexView alignItems={'center'}>
              <Text style={{ marginRight: '6px' }}>{selected.title + ': '}</Text>
              {isRange && <Text>{cvtRangeToTitle(rangeThreshold)}</Text>}
              {isBoolean && <Text>{selected.value[+checked]}</Text>}
            </FlexView>
            <Button className={'choose-condition__button-confirm'} onClick={onConfirmCondition}>{'确认'}</Button>
          </FlexView>
          {isBoolean && (
            <EditBoolean
              valueTitles={selected.value as [string, string]}
              value={checked}
              onChange={setChecked}
            />
          )}
          {isRange && rangeThreshold && (
            <EditRange
              defaultRange={selected.value as [number, number]}
              max={rangeThreshold![1]}
              min={rangeThreshold![0]}
              onChangeThreshold={onChangeRangeThreshold}
              thresholdError={invalidThreshold}
            />
          )}
        </FlexView>
      )}
    </FlexView>
  );
};

export default Comp;
