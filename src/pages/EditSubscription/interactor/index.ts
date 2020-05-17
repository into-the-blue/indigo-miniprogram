import { IInteractor } from '../types';
import { SubscriptionClient } from '@/services/subscription';
import { UserStore, EditSubscriptionStore, MapStore, getStores } from '@/stores';
import Taro from '@tarojs/taro';
import { pick } from '@/utils';
import { setMetroStationAsSubTarget } from '@/stores/helper';

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
      return Taro.atMessage({
        message: '请先登录',
        type: 'warning',
      });
    }
    if (this.editSubscriptionStore.hasError) {
      return Taro.atMessage({
        message: '无效条件',
        type: 'error',
      });
    }
    const {
      targetInfo,
      radius,
      targetType,
      conditions,
      isUpdating,
      metroPayload,
    } = this.editSubscriptionStore;
    const coordinates = targetInfo!.coordinates;
    const city = this.mMap.currentCity;
    const type = targetType;
    const payload =
      type === 'metroStation'
        ? pick(metroPayload, ['stationId', 'stationName', 'urls', 'lineIds', 'coordinates'])
        : { address: targetInfo!.address };

    const body = {
      coordinates,
      city,
      radius,
      conditions,
      type,
      address: targetInfo!.address,
      payload,
    };
    console.warn(conditions);
    try {
      const { success, message } = await (isUpdating
        ? this.updateSubscription
        : this.addSubscription)(body);
      if (!success) {
        console.warn(message);
        Taro.atMessage({
          message,
          type: 'info',
        });
        return;
      }
      Taro.atMessage({
        message: '保存成功',
        type: 'success',
      });
      Taro.navigateBack();
      setTimeout(this.editSubscriptionStore.resetStore, 0);
    } catch (err) {
      console.warn('addSubscription', err);
      Taro.atMessage({
        message: '前方拥挤...',
        type: 'error',
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
      this.editSubscriptionStore.targetInfo!.coordinates,
    );
    if (existingSub) {
      this.editSubscriptionStore.setState({
        conditions: existingSub.conditions,
        radius: existingSub.radius,
        originSubscription: existingSub,
      });
    }
  };

  setTarget = (type: 'metroStation' | 'customLoaction', id: string) => {
    if (type === 'metroStation') {
      setMetroStationAsSubTarget(id);
      return;
    }

    if (type === 'customLoaction') {
      // to be implemented
      return;
    }
  };
}

export { EditSubscriptionInteractor };
