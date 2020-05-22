import { Subject, merge, empty } from 'rxjs';
import { GuaranteeSubject } from './GuaranteeSubject';
import { filter, pluck, tap } from 'rxjs/operators';

type TGuaranteeSubjects<P, K extends keyof P = keyof P> = Map<K, GuaranteeSubject<P[K]>>;

// type Example ={
//   someEvent:{
//     guaranteed?:boolean,
//     data:{
//       someData:1
//     }
//   }
// }

export class Xeno<T> {
  guaranteeSubjects: TGuaranteeSubjects<T> = new Map();
  $center: Subject<any> = new Subject();
  activeGuaranteeEvents: (keyof T)[] = [];
  listeningGuaranteeEvents: (keyof T)[] = [];

  on<K extends keyof T = keyof T>(eventName: K, callback: (data: any) => void) {
    this.addListeningGuaranteeEvents(eventName);
    const subscription = merge(this.$center, this.guaranteeSubjects.get(eventName) || empty())
      .pipe(
        filter(o => o.eventName === eventName),
        tap(() => this.removeActiveGuaranteeEvents(eventName)),
        pluck('data'),
      )
      .subscribe(callback);

    return () => {
      this.removeListeningGuaranteeEvents(eventName);
      this.removeActiveGuaranteeEvents(eventName);
      subscription.unsubscribe();
    };
  }

  next<K extends keyof T = keyof T>(eventName: K, payload: T[K]) {
    if ((payload as any).guaranteed) {
      const subject = this.createOrGetGuaranteeSubject(eventName);
      return subject.next({
        eventName,
        data: payload['data'],
      });
    }
    return this.$center.next({
      eventName,
      data: payload['data'],
    });
  }

  addListeningGuaranteeEvents<K extends keyof T = keyof T>(eventName: K) {
    if (this.hasListener(eventName)) return;
    this.listeningGuaranteeEvents.push(eventName);
  }
  removeListeningGuaranteeEvents<K extends keyof T = keyof T>(eventName: K) {
    this.listeningGuaranteeEvents = this.listeningGuaranteeEvents.filter(e => e !== eventName);
  }

  hasListener<K extends keyof T = keyof T>(eventName: K) {
    return this.listeningGuaranteeEvents.findIndex(e => e === eventName) !== -1;
  }

  createOrGetGuaranteeSubject<K extends keyof T = keyof T>(eventName: K) {
    const subject = this.guaranteeSubjects.get(eventName);
    this.addActiveGuaranteeEvents(eventName);
    if (subject) return subject;
    if (this.hasListener(eventName)) return this.$center;
    const newSub = new GuaranteeSubject<T[K]>(this._mergeValue);
    this.guaranteeSubjects.set(eventName, newSub);
    return newSub;
  }

  _mergeValue(prev: any, curr: any): any {
    return {
      eventName: prev['eventName'],
      data: {
        ...prev['data'],
        ...curr['data'],
      },
    };
  }

  addActiveGuaranteeEvents(eventName: keyof T) {
    const idx = this.activeGuaranteeEvents.findIndex(k => k === eventName);
    if (idx === -1) {
      this.activeGuaranteeEvents.push(eventName);
      return;
    }
  }

  removeActiveGuaranteeEvents(eventName: keyof T) {
    const idx = this.activeGuaranteeEvents.findIndex(k => k === eventName);
    if (idx === -1) return;
    this.activeGuaranteeEvents.splice(idx, 1);
  }
}
