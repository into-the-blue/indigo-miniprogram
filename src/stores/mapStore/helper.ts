import { IMetroStationClient } from '@/types';
import Assets from '@/assets';

export const removeShi = (str: string) => {
  const normalized = str.toLowerCase();
  // is pinyin?
  const reg = /^[a-z]+$/.test(normalized) ? /^[a-z]+(shi)$/ : /^\W+(市)$/;
  return normalized.replace(reg, (...args) => {
    return normalized.replace(args[1], '');
  });
};

export const mapMetroIcon = (station: IMetroStationClient) => {
  const city = station.city;
  switch (city) {
    case 'shanghai':
      return Assets.MetroSH;

    case 'beijing':
      return Assets.MetroBeijing;

    case 'suzhou':
      return Assets.MetroSuzhou;

    case 'hangzhou':
      return Assets.MetroHangzhou;

    case 'nanjing':
      return Assets.MetroNanjing;

    case 'guangzhou':
      return Assets.MetroGuangzhou;

    case 'shenzhen':
      return Assets.MetroShenzhen;
      
    default: {
      return Assets.MetroSH;
    }
  }
};
