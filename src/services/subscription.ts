import { apiClient } from '@/utils';
import { TSubCondition } from '@/types';

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
}
