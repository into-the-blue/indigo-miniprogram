import { observable, action, computed } from 'mobx';
import {
  TSetState,
  IMetroStationClient,
  ICustomLocation,
  TConfigBoolean,
  TConfigRange,
  TSubCondition,
} from '@/types';
import { CONFIGURABLE_KEYS } from './data';

type TTarget =
  | {
      type: 'metroStation';
      payload: IMetroStationClient;
    }
  | {
      type: 'customLocation';
      payload: ICustomLocation;
    };

const DEFAULT_RADIUS = 1000;
class EditSubscriptionStore {
  @observable target?: TTarget;

  @observable configurableKeys: (TConfigBoolean | TConfigRange)[] = CONFIGURABLE_KEYS;
  @observable conditions: TSubCondition[] = [];

  @observable radius: number = DEFAULT_RADIUS;

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

  @computed get availableConfigKeys() {
    return this.configurableKeys.filter(o => !this.conditions.some(c => c.key === o.key));
  }

  @action addCondition = (condition: TSubCondition) => {
    this.conditions.push(condition);
  };

  @action deleteCondition = (index: number) => {
    this.conditions = this.conditions.filter((_, idx) => idx !== index);
  };

  @action resetStore = () => {
    this.conditions = [];
    this.radius = DEFAULT_RADIUS;
  };

  get targetStationId() {
    if (this.targetType === 'metroStation')
      return (this.target!.payload as IMetroStationClient).stationId;
  }

  getDetailedCondition = (key: string) => {
    return this.configurableKeys.find(o => o.key === key)!;
  };
}
export { EditSubscriptionStore };
