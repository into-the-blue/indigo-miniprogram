import { TEditSubTarget } from '../stores';

export type XEditSubscriptionInit = {
  EditSubscription_init: {
    guaranteed: true;
    data: {
      target: TEditSubTarget;
    };
  };
};
