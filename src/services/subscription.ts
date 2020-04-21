import { apiClient } from '@/utils';
import { TSubCondition, ISubscription } from '@/types';

type IAddSubBody = {
  coordinates: [number, number];
  city: string;
  radius: number;
  conditions: TSubCondition[];
} & (
  | {
      address: string;
      type: 'customLocation';
    }
  | {
      stationId: string;
      type: 'metroStation';
    }
);

export class SubscriptionClient {
  static addSubscription = async (
    body: IAddSubBody,
  ): Promise<{ success: boolean; message: 'string' }> => {
    const { data } = await apiClient.post('/subscription', {
      ...body,
    });
    return data;
  };

  static queryUserSubscriptions = async (): Promise<ISubscription[]> => {
    const { data } = await apiClient.get('/subscription');
    return data;
  };

  static updateSubscription = <K extends keyof ISubscription>(
    id: string,
    updates: Pick<ISubscription, K>,
  ): Promise<{ success: boolean; message: string }> => {
    return apiClient.put('/subscription', {
      id,
      ...updates,
    });
  };
}
