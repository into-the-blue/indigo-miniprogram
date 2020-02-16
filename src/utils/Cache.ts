import Taro from '@tarojs/taro';

export const set = (key: string, value: any) => {
  if (!value) return;
  Taro.setStorage({
    key,
    data: value,
  }).catch(err => {});
};

export const get = async (key: string) => {
  return JSON.parse((await Taro.getStorage({ key })).data);
};
