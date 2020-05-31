import { apiClient } from '@/utils/httpClient';
import { IPOI, ICustomLocationClient } from '@/types';

export class LocationClient {
  static searchAddress = async (search: string, city: string): Promise<IPOI[]> => {
    const { data } = await apiClient.get('/location/search', {
      params: {
        search,
        city,
      },
    });
    if (!data.success) throw new Error(data.message);
    return data.data;
  };

  static getCustomLOcation = async (
    coordinates: [number, number],
    address?: string,
    city?: string,
  ): Promise<ICustomLocationClient> => {
    const { data } = await apiClient.get('/location', {
      params: {
        lng: coordinates[0],
        lat: coordinates[1],
        city,
        address,
      },
    });
    if (!data.success) throw new Error(data.message);
    return data.data;
  };
}
