import { observable, action } from 'mobx';

interface IStore {
  currentTabIndex?: number;
  count?: number;
}
class GlobalStore {
  @observable public currentTabIndex: number = 0;

  @observable count: number = 0;
  @action setState = (nextState: IStore) => {
    Object.assign(this, nextState);
  };
}
export { GlobalStore };
