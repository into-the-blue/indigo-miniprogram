import React from 'react';
import { IApartment } from '@/types';
import { TextBar } from '../../TextBar';
import { UNITS } from '@/utils/constants';
import { FlexView } from '../../FlexView';
import { isApartment } from '@/utils';
import { AtTag, AtMessage } from 'taro-ui';
import './styles.scss';
import Button from '../../Button';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import { SubscriptionClient } from '@/services/subscription';
import { Text } from '@/components';
import { BaseEventOrig } from '@tarojs/components';

interface IProps {
  apartment: IApartment;
  additionalInfo?: { title: string; content: string }[];
  inset?: boolean;
}

export const ApartmentInfo = ({ apartment, additionalInfo, inset }: IProps) => {
  const viewApartment = (id: string) => {
    SubscriptionClient.viewApartment(id).catch(err => {
      console.warn('[viewApartment]', err.message);
    });
  };
  const copyUrl = (e: BaseEventOrig<any>) => {
    e.stopPropagation();
    Taro.setClipboardData({
      data: apartment.houseUrl,
    });
    try {
      Taro.atMessage({
        message: '请打开浏览器粘贴查看哦~',
        type: 'success',
        duration: 3000,
      });
    } catch (err) {
      // at message not exists
    }
    viewApartment(apartment.id);
  };
  return (
    <FlexView inset={inset} column neumorphism className={'apartment-info__container'}>
      <FlexView column>
        <FlexView justifyContent={'space-between'} alignItems={'center'}>
          <Text
            className={classNames('apartment-info__title', {
              'apartment-info__title-long': apartment.title.length >= 14,
            })}
          >
            {apartment.title}
          </Text>
          <AtTag
            className={'apartment-info__tag'}
            customStyle={{
              visibility: isApartment(apartment.tags) ? 'visible' : 'hidden',
            }}
            active
          >
            {'公寓'}
          </AtTag>
        </FlexView>
        <Text style={{ fontSize: 12, marginLeft: 10 }}>{'上架日期: ' + apartment.createdAt}</Text>
      </FlexView>
      {apartment.distance && (
        <TextBar title={'距离'} content={apartment.distance.toFixed(0) + 'm'} />
      )}
      <TextBar title={'价格'} content={apartment.price + UNITS.CNY} />
      <TextBar title={'面积'} content={apartment.area + UNITS.squreMeter} />
      <TextBar
        title={'每平米价格'}
        content={apartment.pricePerSquareMeter + UNITS.pricePerSquareMeter}
      />
      <TextBar title={'户型'} content={apartment.houseType} />
      <TextBar title={'水电'} content={apartment.water + '/' + apartment.electricity} />
      {additionalInfo &&
        additionalInfo.map(item => (
          <TextBar title={item.title} content={item.content} key={item.title} />
        ))}

      <FlexView>
        <Button onClick={copyUrl}>{'复制链接'}</Button>
      </FlexView>
    </FlexView>
  );
};
