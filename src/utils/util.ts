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

export const findItemByKeyValue = <T>(items: T[], key: keyof T, value: any): T | undefined => {
  return items.find(o => o[key] === value);
};

export const removeItemByKeyValue = <T>(items: T[], key: keyof T, value: any): T[] => {
  return items.filter(o => o[key] !== value);
};
