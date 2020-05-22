export const isObject = (value: any) => {
  if (!value) return false;
  return String(value) === '[object Object]';
};
