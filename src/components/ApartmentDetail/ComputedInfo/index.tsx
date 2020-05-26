import React from 'react';
import { View, Text } from '@tarojs/components';
import { TApartmentComputed } from '@/types';
import { UNITS } from '@/utils/constants';
import { Unit } from './Unit';
import './styles.scss';
import { FlexView } from '../../FlexView';

export const ComputedInfo = ({ computed }: { computed?: TApartmentComputed }) => {
  if (!computed) return <Text>{'对比信息正在努力计算中 ~'}</Text>;

  return (
    <FlexView column className={'computed-info__container'}>
      <Text
        className={'computed-info__title'}
      >{`与附近 ${computed.range} 米内 ${computed.total} 套房源相比:`}</Text>

      <Text className={'computed-info__desc'}>{'*排名为从小到大'}</Text>
      <FlexView justifyContent={'space-evenly'}>
        <FlexView column alignItems={'center'}>
          <Unit title={'价格排名'} content={computed.rankingOfPrice} />
          <Unit title={'平均价格'} content={computed.averagePrice} unit={UNITS.CNY} />
          <Unit title={'价格中位数'} content={computed.medianPrice} unit={UNITS.CNY} />
        </FlexView>

        <FlexView column alignItems={'center'}>
          <Unit title={'面积排名'} content={computed.rankingOfArea} />
          <Unit title={'平均面积'} content={computed.averageArea} unit={UNITS.squreMeter} />
          <Unit title={'面积中位数'} content={computed.medianArea} unit={UNITS.squreMeter} />
        </FlexView>

        <FlexView column alignItems={'center'}>
          <Unit title={'每平米价格排名'} content={computed.rankingOfPPSM} />
          <Unit
            title={'平均每平米价格'}
            content={computed.averagePPSM}
            unit={UNITS.pricePerSquareMeter}
          />
          <Unit
            title={'每平米价格中位数'}
            content={computed.medianPPSM}
            unit={UNITS.pricePerSquareMeter}
          />
        </FlexView>
      </FlexView>

      <View></View>
    </FlexView>
  );
};
