import { observable, action, configure } from 'mobx';

// configure({
//   enforceActions: 'always',
// });

interface IStore {
  count?: number;
}
class ProfileStore {
  @observable public count: number = 0;
  @action setState = (nextState: IStore) => {
    Object.assign(this, nextState);
  };
}
export { ProfileStore };
