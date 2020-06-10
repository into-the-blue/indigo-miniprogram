export const removeShi = (str: string) => {
  const normalized = str.toLowerCase();
  // is pinyin?
  const reg = /^[a-z]+$/.test(normalized) ? /^[a-z]+(shi)$/ : /^\W+(市)$/;
  return normalized.replace(reg, (...args) => {
    return normalized.replace(args[1], '');
  });
};
