import { observable, action } from 'mobx';
import { TSetState, IPOI } from '@/types';

class SearchStore {
  @observable searchResults: IPOI[] = [];
  @observable inputValue:string = ''
  @observable isSearching: boolean = false;


  @action setInputValue=(value:string)=>{
    this.inputValue = value
  }
  @action setIsSearching = (bool: boolean) => {
    this.isSearching = bool;
  };

  @action setSearchResults = (res: IPOI[]) => {
    this.searchResults = res;
  };
  @action setState: TSetState<SearchStore> = next => {
    Object.assign(this, next);
  };
}
export { SearchStore };
