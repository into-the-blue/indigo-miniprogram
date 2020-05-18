import React from 'react';
import { View, Text } from '@tarojs/components';
import { TApartmentComputed } from '@/types';
import { TextBar } from '../TextBar';
import { UNITS } from '@/utils/constants';
import './styles.scss';

export const ComputedInfo = ({ computed }: { computed?: TApartmentComputed }) => {
  if (!computed) return <Text>{'对比信息正在努力计算中 ~'}</Text>;

  return (
    <View className={'flex computed-info__container'}>
      <Text>{`与附近 ${computed.range} 米内 ${computed.total} 套房源相比:`}</Text>
      <TextBar title={'平均价格'} content={computed.averagePrice + UNITS.CNY} />
      <TextBar title={'平均面积'} content={computed.averageArea + UNITS.squreMeter} />
      <TextBar
        title={'平均每平米价格'}
        content={computed.averagePPSM + UNITS.pricePerSquareMeter}
      />
      <TextBar title={'价格中位数'} content={computed.medianPrice + UNITS.CNY} />
      <TextBar
        title={'每平米价格中位数'}
        content={computed.medianPPSM + UNITS.pricePerSquareMeter}
      />
      <TextBar title={'价格排名'} content={computed.rankingOfPrice} />
      <TextBar title={'面积排名'} content={computed.rankingOfArea} />
      <TextBar title={'每平米价格排名'} content={computed.rankingOfPPSM} />
      <TextBar title={'价格最低的房源'} content={computed.lowestPrice + UNITS.CNY} />
      <TextBar
        title={'每平米价格最低的房源'}
        content={computed.lowestPPSM + UNITS.pricePerSquareMeter}
      />
      <TextBar title={'平均价格'} content={computed.averagePrice + UNITS.CNY} />

      <View></View>
    </View>
  );
};
