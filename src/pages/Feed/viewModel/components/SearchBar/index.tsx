import React from 'react';
import { CoverView, CoverImage } from '@tarojs/components';
import './styles.scss';
import Assets from '@/assets';
import classNames from 'classnames';
import { FlexView } from '@/components';

interface IProps {
  onPress: () => void;
}

export const SearchBar = ({ onPress }: IProps) => {
  const toggleInput = () => {
    onPress();
  };

  return (
    <FlexView className={classNames('search-bar__wrapper')}>
      <FlexView className={classNames('search-bar__icon-container')} onClick={toggleInput}>
        <CoverImage className={'search-bar__icon'} src={Assets.Search} />
      </FlexView>
      {/* <AtInput
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
              <CoverView style={{ display: 'flex', flexDirection: 'column' }}>
                {isSearching && (
                  <CoverView style={{ alignSelf: 'center', marginTop: 5 }}>
                    <AtActivityIndicator isOpened content={'Searching...'} />
                  </CoverView>
                )}

                {!searchResults.length && !!inputValue.length && (
                  <Text className={'search-bar__search-placeholder'}>{'空空如也...'}</Text>
                )}
                {!searchResults.length && !inputValue.length && (
                  <Text className={'search-bar__search-placeholder'}>{'搜点什么...'}</Text>
                )}
                {!!searchResults.length && (
                  <CoverView style={{ display: 'flex', flexDirection: 'column' }}>
                    {searchResults.map((result, idx) => (
                      <SearchResultCard
                        result={result}
                        key={'poi' + idx}
                        onPress={() => onPressSearchResult(result)}
                      />
                    ))}
                  </CoverView>
                )}
              </CoverView>
            </ScrollView>
          </CoverView>
        )} */}
    </FlexView>
  );
};
