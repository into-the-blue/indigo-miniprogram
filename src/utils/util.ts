export const sleep = (time: number = 0) => new Promise(resolve => setTimeout(resolve, time));

export const safelyCall = (func?: () => any) => typeof func === 'function' && func();
