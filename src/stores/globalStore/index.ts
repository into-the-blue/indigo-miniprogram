import { observable, action, computed } from 'mobx';

type TRoutes =
  | 'feed'
  | 'apartmentInfo'
  | 'editSubscription'
  | 'notificationRecords'
  | 'profile'
  | 'search'
  | 'freeMembership';
interface IStore {
  currentTabIndex?: number;
  count?: number;
}
class GlobalStore {
  @observable public currentTabIndex: number = 0;

  @observable public currentRoute: TRoutes = 'feed';

  @observable count: number = 0;
  @action setState = (nextState: IStore) => {
    Object.assign(this, nextState);
  };

  isRouteFocused = (route: TRoutes) => {
    return this.currentRoute === route;
  };

  @action setCurrentRoute = (route: TRoutes) => {
    if (route === this.currentRoute) return;
    this.currentRoute = route;
  };

  @action onPressTab = (tabIndex: number) => {
    this.currentTabIndex = tabIndex;
  };
}
export { GlobalStore };
