import React, { useState, useEffect } from 'react';
import { EditThreshold } from './EditThreshold';
import get from 'lodash.get';
import { FlexView } from '@/components/FlexView';

export const EditRange = ({
  // range,
  max,
  min,
  // onChange,
  defaultRange,
  onChangeThreshold,
  thresholdError,
  className,
  style,
}: // reportError,
{
  // range: [number, number];
  max: number;
  min: number;
  defaultRange: [number, number];
  // onChange: (value: [number, number]) => void;
  onChangeThreshold: (type: 'min' | 'max') => (value: string) => string;
  thresholdError?: [boolean, boolean];
  style?: React.CSSProperties;
  className?: string;
  // reportError: (type: 'min' | 'max', isError: boolean) => void;
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
    <FlexView
      className={className}
      style={style}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <EditThreshold
        value={min.toString()}
        onChange={onChangeThreshold('min')}
        lastValue={lastMin}
        defaultValue={defaultRange[0]}
        showError={get(thresholdError, '[0]')}
      />
      <EditThreshold
        value={max.toString()}
        onChange={onChangeThreshold('max')}
        lastValue={lastMax}
        defaultValue={defaultRange[1]}
        showError={get(thresholdError, '[1]')}
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
    </FlexView>
  );
};
