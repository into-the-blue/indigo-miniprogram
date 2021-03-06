import { FeedStore } from '../pages/Feed/stores';
import { GlobalStore } from './globalStore';
import { MapStore } from './mapStore';
import { UserStore } from './userStore';
import { SubscriptionStore } from './subscriptionStore';
import { EditSubscriptionStore } from '@/pages/EditSubscription/stores';
import { NotificationRecordsStore } from '@/pages/NotificationRecords/stores';
import { ApartmentInfoStore } from '@/pages/ApartmentInfo/stores';
import { ModalStore } from './modalStore';
import { FreeMembershipStore } from '@/pages/FreeMembership/stores';
import { SearchStore } from '@/pages/Search/stores';

class RootStore {
  feed: FeedStore;
  global: GlobalStore;
  mMap: MapStore;
  userStore: UserStore;
  subscriptionStore: SubscriptionStore;
  editSubscriptionStore: EditSubscriptionStore;
  modalStore: ModalStore;
  notificationRecordsStore: NotificationRecordsStore;
  apartmentInfoStore: ApartmentInfoStore;
  freeMembershipStore: FreeMembershipStore;
  searchStore: SearchStore;

  constructor() {
    this.feed = new FeedStore();
    this.global = new GlobalStore();
    this.mMap = new MapStore();
    this.userStore = new UserStore();
    this.subscriptionStore = new SubscriptionStore();
    this.editSubscriptionStore = new EditSubscriptionStore();
    this.modalStore = new ModalStore();
    this.notificationRecordsStore = new NotificationRecordsStore();
    this.apartmentInfoStore = new ApartmentInfoStore();
    this.freeMembershipStore = new FreeMembershipStore();
    this.searchStore = new SearchStore();
  }
}
const store = new RootStore();
export default store;

export const getStores: <K extends keyof RootStore>(...keys: K[]) => Pick<RootStore, K> = (
  ...stores
) => {
  const res: any = {};
  for (let key of stores) {
    if (!store[key]) throw new Error('store not exists');
    else res[key] = store[key];
  }
  return res;
};
export {
  GlobalStore,
  FeedStore,
  MapStore,
  UserStore,
  SubscriptionStore,
  EditSubscriptionStore,
  ModalStore,
  ApartmentInfoStore,
};
