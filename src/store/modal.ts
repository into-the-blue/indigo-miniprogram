import { action, observable } from 'mobx';
import { nextState } from '@/types';

const DEFAULT_CONFIRM_TEXT = '确认';
const DEFAULT_CANCEL_TEXT = '取消';
class ModalStore {
  @observable title?: string;
  @observable isOpen: boolean = false;
  @observable confirmText: string = DEFAULT_CONFIRM_TEXT;
  @observable cancelText: string = DEFAULT_CANCEL_TEXT;
  @observable onClose?: () => void;
  @observable onCancel?: () => void;
  @observable onConfirm?: () => void;
  @observable content: string = '';

  @action setState: <K extends keyof ModalStore>(next: nextState<ModalStore, K>) => void = next => {
    Object.assign(this, next);
  };

  @action showModal = (
    content: string,
    options: {
      title?: string;
      confirmText?: string;
      cancelText?: string;
      onClose?: () => void;
      onCancel?: () => void;
      onConfirm?: () => void;
    },
  ) => {
    this.isOpen = true;
    this.content = content;
    Object.assign(this, options);
  };

  @action dismisModal = (callback?: () => void) => {
    callback && callback();
    this.title = undefined;
    this.isOpen = false;
    this.confirmText = DEFAULT_CONFIRM_TEXT;
    this.cancelText = DEFAULT_CANCEL_TEXT;
    this.onClose = undefined;
    this.onCancel = undefined;
    this.onConfirm = undefined;
    this.content = '';
  };
}

export { ModalStore };
