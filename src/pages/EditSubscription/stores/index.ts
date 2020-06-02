import { observable, action, computed } from 'mobx';
import {
  TSetState,
  IMetroStationClient,
  TConfigBoolean,
  TConfigRange,
  TSubCondition,
  ISubscription,
  ICustomLocationClient,
} from '@/types';
import { CONFIGURABLE_KEYS } from './data';

export type TEditSubTarget =
  | {
      type: 'metroStation';
      payload: IMetroStationClient;
    }
  | {
      type: 'customLocation';
      payload: ICustomLocationClient;
    };

const DEFAULT_RADIUS = 1000;
class EditSubscriptionStore {
  @observable originSubscription?: ISubscription;
  @observable target?: TEditSubTarget;

  @observable edited: boolean = false;
  @observable hasError: boolean = false;

  @observable configurableKeys: (TConfigBoolean | TConfigRange)[] = CONFIGURABLE_KEYS;
  @observable conditions: TSubCondition[] = [];

  @observable radius: number = DEFAULT_RADIUS;

  @action setState: TSetState<EditSubscriptionStore> = next => {
    Object.assign(this, next);
  };

  @computed
  get targetType() {
    if (!this.target) return null;
    return this.target!.type;
  }

  @computed
  get targetInfo(): { address: string; coordinates: [number, number] } | null {
    if (!this.target) return null;
    return this.target?.type === 'metroStation'
      ? {
          address: (this.target!.payload as IMetroStationClient).stationName,
          coordinates: (this.target!.payload as IMetroStationClient).coordinates,
        }
      : {
          address: (this.target!.payload as ICustomLocationClient).address,
          coordinates: (this.target!.payload as ICustomLocationClient).coordinates,
        };
  }

  @computed
  get metroPayload() {
    return this.target!.payload as IMetroStationClient;
  }

  @computed
  get customLocationPayload() {
    return this.target!.payload as ICustomLocationClient;
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

  @action
  setEdited = (error?: boolean) => {
    if (typeof error === 'boolean') this.hasError = error;
    if (this.edited) return;
    this.edited = true;
  };

  @action resetStore = () => {
    this.conditions = [];
    this.radius = DEFAULT_RADIUS;
    this.edited = false;
  };

  @action setRadius = (value: string) => {
    if (!/\d+/g.test(value)) return this.radius.toString();
    this.radius = +value;
    this.setEdited();
    return value;
  };

  get targetStationId() {
    if (this.targetType === 'metroStation')
      return (this.target!.payload as IMetroStationClient).stationId;
  }

  getDetailedCondition = (key: string) => {
    return this.configurableKeys.find(o => o.key === key)!;
  };

  @computed
  get isUpdating() {
    return !!this.originSubscription;
  }

  @action
  updateSingleCondition = (idx: number, value: boolean | [number, number]) => {
    this.conditions[idx].condition = value;
  };
}
export { EditSubscriptionStore };
