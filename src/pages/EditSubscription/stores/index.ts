import { observable, action, computed } from 'mobx';
import { TSetState, IMetroStationClient, ICustomLocation } from '@/types';

type TTarget =
  | {
      type: 'metroStation';
      payload: IMetroStationClient;
    }
  | {
      type: 'customLocation';
      payload: ICustomLocation;
    };

class EditSubscriptionStore {
  @observable target?: TTarget;
  @action setState: TSetState<EditSubscriptionStore> = next => {
    Object.assign(this, next);
  };

  @computed
  get targetType() {
    return this.target!.type;
  }

  @computed
  get targetInfo(): { address: string; coordinates: [number, number] } {
    return this.target?.type === 'metroStation'
      ? {
          address: (this.target!.payload as IMetroStationClient).stationName,
          coordinates: (this.target!.payload as IMetroStationClient).coordinates,
        }
      : {
          address: (this.target!.payload as ICustomLocation).address,
          coordinates: (this.target!.payload as ICustomLocation).coordinates,
        };
  }
}
export { EditSubscriptionStore };
