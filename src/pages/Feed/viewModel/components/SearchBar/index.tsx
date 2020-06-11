import React, { useState, useCallback } from 'react';
import { Image, CoverView, Text, ScrollView } from '@tarojs/components';
import './styles.scss';
import Assets from '@/assets';
import classNames from 'classnames';
import { FlexView } from '@/components';
import { AtInput, AtActivityIndicator } from 'taro-ui';
import debounce from 'lodash.debounce'
import { getStores } from '@/stores';
import { LocationClient } from '@/services/location';
import { IPOI } from '@/types';
import { SearchResultCard } from './SearchResultCard';
import { injectXeno, XenoComponentProps } from '@/xeno';
import { XAllEvents } from '@/utils/xeno';
import Taro from '@tarojs/taro';

interface IProps extends XenoComponentProps<XAllEvents> {
  isSearchBarOpen: boolean;
  openSearchBar: () => void;
  closeSearchBar: () => {};
}

export const SearchBar = injectXeno(
  ({ next, isSearchBarOpen, openSearchBar, closeSearchBar }: IProps) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [showSearchResult, setShowSearchResult] = useState<boolean>(true);
    const [searchResults, setSearchResults] = useState<IPOI[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const { mMap } = getStores('mMap');
    const toggleInput = () => {
      const { userStore } = getStores('userStore');
      if (!isSearchBarOpen) {
        if (!userStore.isLoggedIn) {
          return Taro.atMessage({
            message: '请先登录',
            type: 'warning',
          });
        }
        if (!userStore.isMember || userStore.isMembershipExpired) {
          Taro.atMessage({
            message: '搜索功能需要会员身份, 快去领取免费会员吧~',
            type: 'info',
          });
          return;
        }
        openSearchBar();
        return;
      }
      closeSearchBar();
    };

    const searchAddress = useCallback(
      debounce(async (text: string) => {
        if (!text.length) return;
        try {
          setIsSearching(true);
          const result = await LocationClient.searchAddress(text, mMap.currentCity!);
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
      closeSearchBar();
      next('Feed_setMapFocusedPosition', {
        data: {
          type: 'customLocation',
          payload: result,
        },
      });
    };

    return (
      <CoverView
        className={classNames('search-bar__wrapper', {
          'search-bar__wrapper-open': isSearchBarOpen,
        })}
      >
        <FlexView className={classNames('search-bar__icon-container')} onClick={toggleInput}>
          <Image
            src={Assets.Search}
            className={classNames('search-bar__icon', {
              'search-bar__icon-open': isSearchBarOpen,
            })}
          />
        </FlexView>
        <AtInput
          className={classNames('search-bar__input', {
            'search-bar__input-open': isSearchBarOpen,
          })}
          value={inputValue}
          placeholderStyle={'color:white'}
          placeholder={'搜索: ...'}
          name={'search-bar'}
          customStyle={{ color: 'white' }}
          onChange={onChange}
          onFocus={onFocus}
        />
        {showSearchResult && isSearchBarOpen && (
          <CoverView className={'search-bar__search-result'}>
            <ScrollView scrollY className={'search-bar__search-result-container'}>
              <FlexView column>
                {isSearching && (
                  <FlexView style={{ alignSelf: 'center', marginTop: 5 }}>
                    <AtActivityIndicator isOpened content={'Searching...'} />
                  </FlexView>
                )}

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
  },
);
