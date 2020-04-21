import { IInteractor } from '../types';
import { SubscriptionClient } from '@/services/subscription';
import { UserStore, EditSubscriptionStore, MapStore } from '@/store';

class EditSubscriptionInteractor implements IInteractor {
  constructor(
    public userStore: UserStore,
    public editSubscriptionStore: EditSubscriptionStore,
    public mMap: MapStore,
  ) {}

  onSave = async () => {
    if (!this.userStore!.isLoggedIn) {
      return Taro.showToast({
        title: '请先登录',
        duration: 2000,
      });
    }
    if (this.editSubscriptionStore.hasError) {
      return Taro.showToast({
        title: '条件不合法',
        duration: 2000,
      });
    }
    const {
      targetInfo,
      radius,
      targetStationId,
      targetType,
      conditions,
    } = this.editSubscriptionStore;
    const coordinates = targetInfo.coordinates;
    const city = this.mMap.currentCity;
    const type = targetType;
    const payload =
      type === 'metroStation'
        ? { stationId: targetStationId!, type }
        : { address: targetInfo.address, type };

    const body = {
      coordinates,
      city,
      radius,
      conditions,
      ...payload,
    };
    try {
      const { success, message } = await SubscriptionClient.addSubscription(body);
      if (!success) {
        console.warn(message);
        return;
      }
      Taro.showToast({
        title: '订阅成功',
        icon: 'success',
        duration: 2000,
      });
      Taro.navigateBack();
      setTimeout(this.editSubscriptionStore.resetStore, 0);
    } catch (err) {
      console.warn('addSubscription', err);
      Taro.showToast({
        title: '前方拥挤...',
        duration: 2000,
      });
    }
  };
}

export { EditSubscriptionInteractor };
