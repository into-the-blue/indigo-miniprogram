import React, { useState, useCallback } from 'react';
import { Image, CoverView, Text, ScrollView } from '@tarojs/components';
import './styles.scss';
import Assets from '@/assets';
import classNames from 'classnames';
import { FlexView } from '@/components';
import { AtInput, AtActivityIndicator } from 'taro-ui';
import { debounce } from 'lodash';
import { getStores } from '@/stores';
import { LocationClient } from '@/services/location';
import { IPOI } from '@/types';
import { SearchResultCard } from './SearchResultCard';
import { injectXeno, XenoComponentProps } from '@/xeno';
import { XAllEvents } from '@/utils/xeno';

interface IProps extends XenoComponentProps<XAllEvents> {}

export const SearchBar = injectXeno(({ next }: IProps) => {
  const [inputOpen, setInputOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [showSearchResult, setShowSearchResult] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<IPOI[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const { mMap } = getStores('mMap');
  const toggleInput = () => {
    setInputOpen(!inputOpen);
  };

  const searchAddress = useCallback(
    debounce(async (text: string) => {
      if (!text.length) return;
      try {
        setIsSearching(true);
        const result = await LocationClient.searchAddress(text, mMap.currentCity);
        setSearchResults(result);
      } catch (err) {
        //
      } finally {
        setIsSearching(false);
      }
    }, 500),
    [],
  );

  const onChange = (value: string) => {
    setInputValue(value);
    searchAddress(value);
    return value;
  };

  const onFocus = () => {
    setShowSearchResult(true);
  };

  const onPressSearchResult = (result: IPOI) => {
    setInputOpen(false);
    next('Feed_setMapFocusedPosition', {
      data: {
        type: 'customLocation',
        coordinates: result.coordinates,
        city: result.city,
        address: result.address,
        payload: result,
      },
    });
  };

  return (
    <CoverView
      className={classNames('search-bar__wrapper', {
        'search-bar__wrapper-open': inputOpen,
      })}
    >
      <FlexView className={classNames('search-bar__icon-container')} onClick={toggleInput}>
        <Image
          src={Assets.Search}
          className={classNames('search-bar__icon', {
            'search-bar__icon-open': inputOpen,
          })}
        />
      </FlexView>
      <AtInput
        className={classNames('search-bar__input', {
          'search-bar__input-open': inputOpen,
        })}
        value={inputValue}
        placeholderStyle={'color:white'}
        placeholder={'搜索: ...'}
        name={'search-bar'}
        customStyle={{ color: 'white' }}
        onChange={onChange}
        onFocus={onFocus}
      />
      {showSearchResult && inputOpen && (
        <CoverView className={'search-bar__search-result'}>
          <ScrollView scrollY className={'search-bar__search-result-container'}>
            <FlexView column>
              {isSearching && <AtActivityIndicator isOpened content={'Searching...'} />}
              {!searchResults.length && !!inputValue.length && (
                <Text className={'search-bar__search-placeholder'}>{'空空如也...'}</Text>
              )}
              {!searchResults.length && !inputValue.length && (
                <Text className={'search-bar__search-placeholder'}>{'搜点什么...'}</Text>
              )}
              {!!searchResults.length && (
                <FlexView column>
                  {searchResults.map((result, idx) => (
                    <SearchResultCard
                      result={result}
                      key={'poi' + idx}
                      onPress={() => onPressSearchResult(result)}
                    />
                  ))}
                </FlexView>
              )}
            </FlexView>
          </ScrollView>
        </CoverView>
      )}
    </CoverView>
  );
});
