export const sleep = (time: number = 0) => new Promise(resolve => setTimeout(resolve, time));

export const safelyCall = (func?: () => any) => typeof func === 'function' && func();

export const isNull = (value: any) => value === null || typeof value === 'undefined';

export const pick = <T, K extends keyof T>(
  obj: T,
  keys: K[],
  ignoreNull: boolean = true,
): Pick<T, K> => {
  const toReturn: any = {};
  keys.forEach(key => {
    const value = obj[key];
    if (isNull(value) && !ignoreNull) return;
    toReturn[key] = value;
  });
  return toReturn;
};

export const Omit = <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const toReturn: any = {};
  Object.keys(key => {
    if (keys.includes(key)) return;
    const value = obj[key];
    toReturn[key] = value;
  });
  return toReturn;
};

export const findItemByKeyValue = <T>(items: T[], value: any, key?: keyof T): T | undefined => {
  return items.find(o => (key ? o[key] : o) === value);
};

export const removeItemByKeyValue = <T>(items: T[], value: any, key?: keyof T): T[] => {
  return items.filter(o => (key ? o[key] : o) !== value);
};

export const isApartment = (tags: string[]) => {
  if (!tags) return false;
  return tags.includes('公寓');
};

export const isObject = (value: any) => {
  if (!value) return false;
  return String(value) === '[object Object]';
};
