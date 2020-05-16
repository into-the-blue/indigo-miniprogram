import { observable, action } from 'mobx';

export class BaseViewStore {
  @observable isLoading: boolean = true;
  @observable isError: boolean = false;

  @action showLoading = () => {
    this.isLoading = true;
  };

  @action hideLoading = () => {
    this.isLoading = false;
  };

  @action onInitStart = () => {
    this.isLoading = true;
    this.isError = false;
  };

  @action onInitError = () => {
    this.isLoading = false;
    this.isError = true;
  };
}
