import React from 'react';
import { IPOI } from '@/types';
import { FlexView, Text } from '@/components';
import './styles.scss';

export const SearchResultCard = ({ result, onPress }: { result: IPOI; onPress: () => void }) => {
  return (
    <FlexView className={'search-result__container'} column onClick={onPress}>
      <FlexView>
        <Text className={'search-result__district'}>{result.district}</Text>
        <Text className={'search-result__dot'}>{'·'}</Text>
        <Text className={'search-result__name'}>{result.name}</Text>
      </FlexView>

      <Text className={'search-result__address'}>{result.address}</Text>
    </FlexView>
  );
};
