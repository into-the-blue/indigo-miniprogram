import Taro from '@tarojs/taro';

export class Cache {
  static set = async (key: string, value: any) => {
    if (!value) return;
    await Taro.setStorage({
      key,
      data: value,
    }).catch(err => {});
  };
  static get = async (key: string) => {
    return (await Taro.getStorage({ key }).catch(err => ({ data: null }))).data as any;
  };
}
