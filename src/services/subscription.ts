import { apiClient } from '@/utils';
import {
  TSubCondition,
  ISubscription,
  ISubscriptionClient,
  THttpResponse,
  ISubscriptionNotificationRecordClient,
} from '@/types';

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
  static addSubscription = async (body: IAddSubBody): Promise<THttpResponse> => {
    const { data } = await apiClient.post('/subscription', {
      ...body,
    });
    return data;
  };

  static queryUserSubscriptions = async (): Promise<ISubscriptionClient[]> => {
    const { data } = await apiClient.get('/subscription');
    return data.data;
  };

  static updateSubscription = async <K extends keyof ISubscription>(
    id: string,
    updates: Pick<ISubscription, K>,
  ): Promise<THttpResponse> => {
    const { data } = await apiClient.put('/subscription', {
      id,
      ...updates,
    });
    return data;
  };

  static deleteSubscription = async (
    id: string,
  ): Promise<THttpResponse<{ deletedCount: number }>> => {
    const { data } = await apiClient.delete('/subscription', {
      params: {
        id,
      },
    });
    return data;
  };

  static querySubscriptionNotificationRecords = async (
    subscriptionId: string,
    skip: number = 0,
  ): Promise<ISubscriptionNotificationRecordClient[]> => {
    const { data } = await apiClient.get('/subscription/notifications', {
      params: {
        id: subscriptionId,
        skip,
      },
    });
    return data.data;
  };
  static querySubscriptionByCoordinates = async (
    coordinates: [number, number],
  ): Promise<ISubscriptionClient | undefined> => {
    const { data } = await apiClient.get('/subscription', {
      params: { coordinates },
    });
    return data.data[0];
  };

  static viewtNotifications = async (ids: string[]) => {
    return apiClient.post('/subscription/view_notification', {
      ids,
    });
  };

  static viewApartment = async (apartment_id: string) => {
    return apiClient.post('/subscription/view_apartment', {
      apartment_id,
    });
  };
}
