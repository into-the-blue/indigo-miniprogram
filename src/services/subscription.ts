import { apiClient } from '@/utils';
import { TSubCondition, ISubscription, ISubscriptionClient } from '@/types';

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

  static queryUserSubscriptions = async (): Promise<ISubscriptionClient[]> => {
    const { data } = await apiClient.get('/subscription');
    return data;
  };

  static updateSubscription = async <K extends keyof ISubscription>(
    id: string,
    updates: Pick<ISubscription, K>,
  ): Promise<{ success: boolean; message: string }> => {
    const { data } = await apiClient.put('/subscription', {
      id,
      ...updates,
    });
    return data;
  };

  static deleteSubscription = async (
    id: string,
  ): Promise<{
    success: boolean;
    deletedCount: number;
  }> => {
    const { data } = await apiClient.delete('/subscription', {
      params: {
        id,
      },
    });
    return data;
  };
}
