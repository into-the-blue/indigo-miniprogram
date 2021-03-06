import React from 'react';
import { observer, inject } from 'mobx-react';
import { ScrollView } from '@tarojs/components';
// import {} from 'taro-ui';
import { IViewModel, IViewModelProps } from '../types';
import { SearchPresenter } from '../presenter';
import {} from '../interactor';
import {} from '../stores';
import { AtInput, AtActivityIndicator } from 'taro-ui';
import { FlexView, Text } from '@/components';
import { injectXeno } from '@/xeno';
import { SearchResultCard } from './components/SearchResultCard';
import './styles.scss';

@inject('global', 'searchStore')
@observer
class SearchViewModel extends React.Component<IViewModelProps> implements IViewModel {
  presenter: SearchPresenter;

  constructor(props: IViewModelProps) {
    super(props);

    this.presenter = this.props.buildPresenter(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  get getProps() {
    return this.props;
  }

  render() {
    const { inputValue, isSearching, searchResults } = this.props.searchStore!;
    return (
      <FlexView
        column
        style={{
          flex: 1,
          height: searchResults.length ? undefined : '100vh',
          backgroundColor: '#eee',
        }}
      >
        <FlexView column className={'search__input'}>
          <AtInput
            style={{ backgroundColor: 'transparent', border: 'none' }}
            customStyle={{ backgroundColor: 'transparent' }}
            // placeholderStyle={{ backgroundColor: 'transparent' }}
            value={inputValue}
            className={'input-base'}
            placeholder={'搜索: ...'}
            name={'search-bar'}
            onChange={this.presenter.onChange}
          />
        </FlexView>
        <FlexView className={'search__search-result'}>
          <ScrollView scrollY className={'search__search-result-container'}>
            <FlexView column>
              <FlexView style={{ alignSelf: 'center', marginTop: 5 }}>
                <AtActivityIndicator isOpened={isSearching} content={'Searching...'} />
              </FlexView>

              {!searchResults.length && !!inputValue.length && (
                <Text className={'search__search-placeholder'}>{'空空如也...'}</Text>
              )}
              {!searchResults.length && !inputValue.length && (
                <Text className={'search__search-placeholder'}>{'搜点什么...'}</Text>
              )}
              {!!searchResults.length && (
                <FlexView column>
                  {searchResults.map((result, idx) => (
                    <SearchResultCard
                      result={result}
                      key={'poi' + idx}
                      onPress={() => this.presenter.onPressSearchResult(result)}
                    />
                  ))}
                </FlexView>
              )}
            </FlexView>
          </ScrollView>
        </FlexView>
      </FlexView>
    );
  }
}

export default injectXeno(SearchViewModel);
