import { apiClient } from '@/utils/httpClient';
import { IPOI, ICustomLocationClient, IDecodedCoordinates, IAvailableCity } from '@/types';

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
        coordinates: poi.coordinates,
        city: poi.city,
        address: poi.address,
        name: poi.name,
        district: poi.district,
      },
    });
    if (!data.success) throw new Error(data.message);
    return data.data;
  };

  static decodeCoordinates = async (coordinates: number[]): Promise<IDecodedCoordinates | null> => {
    const { data } = await apiClient.get('/location/decode_coordinates', {
      params: {
        coordinates,
      },
    });
    return data.data;
  };

  static getAvailableCities = async (): Promise<IAvailableCity[]> => {
    const { data } = await apiClient.get('/location/available_cities');
    return data.data;
  };
}
