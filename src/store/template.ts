import { action, observable } from 'mobx';
import { nextState } from '@/types';

class TemplateStore {
  @action setState: <K extends keyof TemplateStore>(
    next: nextState<TemplateStore, K>,
  ) => void = next => {
    Object.assign(this, next);
  };
}

export { TemplateStore };
