import React from 'react';
import { FlexView } from '../../FlexView';
import './styles.scss';
import { Text } from '@/components';

interface IProps {
  content: string | number;
  title: string;
  unit?: string;
}

export const Unit = ({ content, title, unit }: IProps) => {
  return (
    <FlexView column alignItems={'center'} margin={'5px 8px'}>
      <FlexView alignItems={'flex-end'}>
        <Text className={'unit__content'}>{content}</Text>
        {unit && <Text className={'unit__unit'}>{unit}</Text>}
      </FlexView>
      <Text className={'unit__title'}>{title}</Text>
    </FlexView>
  );
};
