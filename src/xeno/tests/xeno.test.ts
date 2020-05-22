import { Xeno } from '../Xeno';

type EventA = {
  eventA: {
    guaranteed: true;
    data: {
      name?: string;
      year?: number;
    };
  };
};
type EventB = {
  evtB: {
    data: [{ a: 1 }];
  };
};

type AllEvents = EventA & EventB;

const xeno = new Xeno<AllEvents>();

xeno.next('eventA', { guaranteed: true, data: { name: '123' } });
xeno.next('eventA', { guaranteed: true, data: { year: 20 } });

const unlisten = xeno.on('eventA', data => {
  console.warn('111',data);
});
const unlisten2 = xeno.on('evtB', data => {
  console.warn('222', data);
});
unlisten();
xeno.next('eventA', { guaranteed: true, data: { name: '123', year: 18 } });
xeno.next('evtB', { data: [{ a: 1 }] });

unlisten2();
xeno.next('evtB', { data: [{ a: 1 }] });
