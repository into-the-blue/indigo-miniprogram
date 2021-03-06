import { IInteractor } from '../types';
import { SubscriptionClient } from '@/services/subscription';
import { UserStore, EditSubscriptionStore, MapStore, getStores } from '@/stores';
import Taro from '@tarojs/taro';
import { pick } from '@/utils';
import { TEditSubTarget } from '../stores';
import { ISubscriptionClient } from '@/types';

class EditSubscriptionInteractor implements IInteractor {
  constructor(
    public userStore: UserStore,
    public editSubscriptionStore: EditSubscriptionStore,
    public mMap: MapStore,
  ) {}
  updateSubscription = (body: any) => {
    return SubscriptionClient.updateSubscription(
      this.editSubscriptionStore.originSubscription!.id!,
      body,
    );
  };

  checkIfAbleToSave = () => {
    if (!this.userStore!.isLoggedIn) {
      Taro.atMessage({
        message: '请先登录',
        type: 'warning',
      });
      return false;
    }
    if (!this.userStore.isMember || this.userStore.isMembershipExpired) {
      Taro.atMessage({
        message: '无效会员',
        type: 'error',
      });
      return false;
    }
    if (this.editSubscriptionStore.hasError) {
      Taro.atMessage({
        message: '无效条件',
        type: 'error',
      });
      return false;
    }
    return true;
  };

  onSave = async () => {
    if (!this.checkIfAbleToSave()) return;
    const {
      targetInfo,
      radius,
      targetType,
      conditions,
      isUpdating,
      metroPayload,
      customLocationPayload,
    } = this.editSubscriptionStore;
    const coordinates = targetInfo!.coordinates;
    const city = this.mMap.currentCity;
    const type = targetType;
    const payload =
      type === 'metroStation'
        ? pick(metroPayload, ['stationId', 'stationName', 'urls', 'lineIds', 'coordinates'])
        : { ...pick(customLocationPayload, ['address', 'city', 'district', 'id', 'name']) };

    const body = {
      coordinates,
      city,
      radius,
      conditions,
      type,
      address: targetInfo!.address,
      payload,
    };
    console.warn('[onSave]', conditions);
    try {
      const { success, message, code } = await (isUpdating
        ? this.updateSubscription
        : SubscriptionClient.addSubscription)(body);
      if (!success) {
        console.warn('[onSave]', message);
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
      console.warn('[onSave]', err);
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
  getExistingSub = () => {
    const { targetInfo } = this.editSubscriptionStore;
    if (!targetInfo) return;
    const exits = this._getExistingSub();
    console.warn('[getExistingSub]', exits);
    if (exits) return;
    this.queryExistingSub();
  };

  _getExistingSub = () => {
    const { subscriptionStore } = getStores('subscriptionStore');
    const existingSub = subscriptionStore.findSubscriptionByCoordinates(
      this.editSubscriptionStore.targetInfo!.coordinates,
    );
    if (existingSub) {
      this.setExistingSubscription(existingSub);
    }
    return !!existingSub;
  };

  setExistingSubscription = (sub: ISubscriptionClient) => {
    this.editSubscriptionStore.setState({
      conditions: sub.conditions,
      radius: sub.radius,
      originSubscription: sub,
    });
  };

  queryExistingSub = async () => {
    const { coordinates } = this.editSubscriptionStore.targetInfo!;
    try {
      const sub = await SubscriptionClient.querySubscriptionByCoordinates(coordinates);
      console.warn('[queryExistingSub]', sub);
      if (!sub) return;
      this.setExistingSubscription(sub);
    } catch (err) {
      console.warn('[queryExistingSub]', err.message);
    }
  };

  setTarget = (target: TEditSubTarget) => {
    this.editSubscriptionStore.setState({
      target,
    });
  };

  resetState=()=>{
    this.editSubscriptionStore.resetStore()
  }
}

export { EditSubscriptionInteractor };
