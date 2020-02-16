import { observable, action, configure } from 'mobx';

// configure({
//   enforceActions: 'always',
// });

interface IStore {
  coordinate?: {
    lat: number;
    lng: number;
  };
}
class FeedStore {
  @observable public coordinate?: {
    lat: number;
    lng: number;
  } = {
    lat: 31.2494,
    lng: 121.397,
  };
  @action setState = (nextState: IStore) => {
    Object.assign(this, nextState);
  };
}
export { FeedStore };
