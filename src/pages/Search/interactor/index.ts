import { IInteractor } from '../types';
import { SearchStore } from '../stores';
import debounce from 'lodash.debounce';
import { LocationClient } from '@/services/location';
import { getStores } from '@/stores';

class SearchInteractor implements IInteractor {
  constructor(private searchStore: SearchStore) {}

  onChangeInput = (value: string) => {
    this.searchStore.setInputValue(value);
    this.searchAddress(value);
  };

  searchAddress = debounce(async (text: string) => {
    if (!text.length) return;
    try {
      const { mMap } = getStores('mMap');
      this.searchStore.setIsSearching(true);
      const result = await LocationClient.searchAddress(text, mMap.currentCity!);
      this.searchStore.setSearchResults(result);
    } catch (err) {
      //
    } finally {
      this.searchStore.setIsSearching(false);
    }
  }, 500);
}

export { SearchInteractor };
