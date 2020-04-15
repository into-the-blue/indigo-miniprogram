export const convertStringToNumber = (v: string) => {
  const isNegative = /^-[0-9]+$/.test(v);
  v = v.replace(/[^0-9]/g, '');
  let _value = +v;
  if (isNegative) _value = -_value;
  return _value;
};

export const cvtRangeToTitle = (range: [number, number] | null) => {
  if (!range) return 'N - N';
  return range.map(v => (v === -1 ? '不限' : v)).join(' - ');
};

export const calNextThreshold = (type: 'min' | 'max', current: [number, number], value: number) => {
  const nextThreshold: [number, number] = current!.slice() as [number, number];
  if (type === 'min') {
    nextThreshold[0] = value;
  }
  if (type === 'max') {
    nextThreshold[1] = value;
  }
  return nextThreshold;
};
