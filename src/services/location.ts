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

  static getCustomLocationFromPOI = async (poi: IPOI): Promise<ICustomLocationClient> => {
    const { data } = await apiClient.get('/location/poi', {
      params: {
        lng: poi.coordinates[0],
        lat: poi.coordinates[1],
        city: poi.city,
        address: poi.address,
        name: poi.name,
        district: poi.district,
      },
    });
    if (!data.success) throw new Error(data.message);
    return data.data;
  };
}
