import { observable, action } from 'mobx';
import { TSetState } from '@/types';

class TemplateStore {
  @observable public count: number = 0;
  @action setState: TSetState<TemplateStore> = next => {
    Object.assign(this, next);
  };
}
export { TemplateStore };
