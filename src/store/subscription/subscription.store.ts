import { action, observable, computed } from 'mobx';
import { nextState, TConfigBoolean, TConfigRange, TSubCondition } from '@/types';
import { CONFIGURABLE_KEYS } from './subscription.data';

class SubscriptionStore {
  @observable configurableKeys: (TConfigBoolean | TConfigRange)[] = CONFIGURABLE_KEYS;
  @observable conditions: TSubCondition[] = [];

  @action setState: <K extends keyof SubscriptionStore>(
    next: nextState<SubscriptionStore, K>,
  ) => void = (next) => {
    Object.assign(this, next);
  };

  @computed get availableConfigKeys() {
    return this.configurableKeys.filter((o) => !this.conditions.some((c) => c.key === o.key));
  }

  @action addCondition = (condition: TSubCondition) => {
    this.conditions.push(condition);
  };

  getDetailedCondition = (key: string) => {
    return this.configurableKeys.find((o) => o.key === key)!;
  };
}

export { SubscriptionStore };
