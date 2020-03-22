import React from 'react';
import { View, Button, Text, CoverView } from '@tarojs/components';
import { IApartmentComputedInfo } from '@/types';

export const ComputedInfo = ({ computed }: { computed?: IApartmentComputedInfo }) => {
  if (!computed) return <Text>{'对比信息正在努力计算中 ~'}</Text>;

  return (
    <View className={'flex computed-info-container'}>
      <Text>{`与附近 ${computed.range} 米内 ${computed.total} 套房源相比:`}</Text>
      <Text>{'平均价格: ' + computed.averagePrice}</Text>
      <Text>{'平均面积: ' + computed.averageArea}</Text>
      <Text>{'平均每平米价格: ' + computed.averagePPSM}</Text>

      <Text>{'价格中位数: ' + computed.medianPrice}</Text>
      <Text>{'面积中位数: ' + computed.medianArea}</Text>
      <Text>{'每平米价格中位数: ' + computed.medianPPSM}</Text>
      <Text>{'价格排名: ' + computed.rankingOfPrice}</Text>
      <Text>{'面积: ' + computed.rankingOfArea}</Text>
      <Text>{'每平米价格排名: ' + computed.rankingOfPPSM}</Text>

      <Text>{'价格最低的房源: ' + computed.lowestPrice}</Text>
      <Text>{'每平米价格最低的房源: ' + computed.lowestPPSM}</Text>
    </View>
  );
};
