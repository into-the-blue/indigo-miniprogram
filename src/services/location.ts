import { apiClient } from '@/utils/httpClient';
import { IPOI } from '@/types';

export class LocationClient {
  static searchAddress = async (search: string, city: string): Promise<IPOI[]> => {
    const { data } = await apiClient.get('/location/search', {
      params: {
        search,
        city,
      },
    });
    return data.data;
  };
}
