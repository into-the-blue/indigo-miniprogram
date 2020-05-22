import { Subject, Subscriber } from 'rxjs';
import { isObject } from './helper';

export class GuaranteeSubject<T> extends Subject<T> {
  private value: T | null = null;

  private _merger?: <K1 extends keyof T = keyof T, K2 extends keyof T = keyof T>(
    v1: Pick<T, K1>,
    v2: Pick<T, K2>,
  ) => T;

  constructor(
    merger?: <K1 extends keyof T = keyof T, K2 extends keyof T = keyof T>(
      v1: Pick<T, K1>,
      v2: Pick<T, K2>,
    ) => T,
  ) {
    super();
    if (merger) this._merger = merger;
  }

  get hasSubscriber() {
    return this.observers.length > 0;
  }

  _subscribe(subscriber: Subscriber<T>) {
    const subscription = super._subscribe(subscriber);
    if (this.value !== null && subscription && !subscription.closed) subscriber.next(this.value);
    return subscription;
  }

  _onUnsubscribe() {
    this.value = null;
  }

  next<K extends keyof T>(value: Pick<T, K> | T) {
    if (this.hasSubscriber) {
      super.next(value as T);
      return;
    }
    if (isObject(this.value) && isObject(value) && this._merger) {
      this.value = this._merger(this.value!, value);
      return;
    }
    this.value = value as T;
  }
  unsubscribe() {
    this._onUnsubscribe();
    super.unsubscribe();
  }
}
