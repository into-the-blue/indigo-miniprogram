import { IInteractor } from '../types';
import { SubscriptionClient } from '@/services/subscription';
import { UserStore, EditSubscriptionStore, MapStore, getStores } from '@/store';
import Taro from '@tarojs/taro';

class EditSubscriptionInteractor implements IInteractor {
  constructor(
    public userStore: UserStore,
    public editSubscriptionStore: EditSubscriptionStore,
    public mMap: MapStore,
  ) {}

  addSubscription = (body: any) => {
    return SubscriptionClient.addSubscription(body);
  };

  updateSubscription = (body: any) => {
    return SubscriptionClient.updateSubscription(
      this.editSubscriptionStore.originSubscription!.id!,
      body,
    );
  };

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
      isUpdating,
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
    console.warn(conditions);
    try {
      const { success, message } = await (isUpdating
        ? this.updateSubscription
        : this.addSubscription)(body);
      if (!success) {
        console.warn(message);
        Taro.showToast({
          title: message,
          duration: 2000,
        });
        return;
      }
      Taro.showToast({
        title: '保存成功',
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

  /**
   *
   *
   * @memberof EditSubscriptionInteractor
   * get existing subscription from local store
   */
  getExistingSubFromLocal = () => {
    const { targetType } = this.editSubscriptionStore;
    if (targetType === 'metroStation') {
      this.getExistingMetroSub();
    }
    if (targetType === 'customLocation') {
      //
    }
  };

  getExistingMetroSub = () => {
    const { subscriptionStore } = getStores('subscriptionStore');
    const existingSub = subscriptionStore.findSubscriptionByCoordinates(
      this.editSubscriptionStore.targetInfo.coordinates,
    );
    if (existingSub) {
      this.editSubscriptionStore.setState({
        conditions: existingSub.conditions,
        radius: existingSub.radius,
        originSubscription: existingSub,
      });
    }
  };
}

export { EditSubscriptionInteractor };
