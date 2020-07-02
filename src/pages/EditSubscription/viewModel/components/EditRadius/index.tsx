import React from 'react';
import { AtInput } from 'taro-ui';
import './styles.scss';
import { Text, FlexView } from '@/components';

const EditRadius = ({
  radius,
  setRadius,
}: {
  radius: number;
  setRadius: (v: string) => string;
}) => {
  return (
    <FlexView neumorphism className={'edit-radius__container'}>
      <Text className={'edit-radius__title'}>{`附近 ${radius} 米`}</Text>
      <AtInput
        className={'input edit-radius__input'}
        name={'setRadius'}
        value={radius.toString()}
        onChange={setRadius}
        type={'number'}
        maxLength={5}

      />
    </FlexView>
  );
};

export default EditRadius;
