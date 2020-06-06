import { apiClient } from '../utils';
import { IBanner } from '@/types';

export class UniversalService {
  static getBanners = async (): Promise<IBanner[]> => {
    const { data } = await apiClient.get('/universal/banners');
    return data.data;
  };
}
