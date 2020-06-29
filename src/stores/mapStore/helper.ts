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

/**
 *
 *
 * @param {number} coor
 *  (1 ~ 10)/10000
 * + - 0.001 ~ 0.0001
 * @returns
 */
export const addCoordinatesBias = (coor: number) => {
  const ran = Math.round(Math.random() * 10) / 10000;
  if (ran > 0.5) {
    return coor + ran;
  }
  return coor - ran;
};
