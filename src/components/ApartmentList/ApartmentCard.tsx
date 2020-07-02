import React from 'react';
import { IApartment } from '@/types';
import { FlexView } from '../FlexView';
import { UNITS } from '@/utils/constants';
import classNames from 'classnames';
import './styles.scss';
import { Text } from '@/components';
import { AtTag } from 'taro-ui';
import { isApartment } from '@/utils';
import { TextBar } from '../TextBar';
import { TSortableKeys } from './types';
import dayjs from 'dayjs';

export const ApartmentCard = ({
  apartment,
  onPressApartment,
  isSelected,
  textStyle,
  activeKey,
}: {
  apartment: IApartment;
  onPressApartment: () => void;
  isSelected: boolean;
  textStyle?: React.CSSProperties;
  activeKey: TSortableKeys | null;
}) => {
  return (
    <FlexView
      neumorphism
      className={'apartment-card__wrapper'}
      inset={isSelected}
      onClick={onPressApartment}
    >
      <FlexView column className={classNames('apartment-card__container')}>
        <FlexView style={{ backgroundColor: 'transparent' }} alignItems={'center'}>
          <Text
            className={classNames('apartment-card__text', {
              'apartment-card__text-highlight': activeKey === 'houseType',
            })}
            style={{ ...textStyle }}
          >
            {apartment.houseType}
          </Text>
          <AtTag
            className={'apartment-card__tag'}
            customStyle={{
              visibility: isApartment(apartment.tags) ? 'visible' : 'hidden',
            }}
            active
          >
            {'公寓'}
          </AtTag>
        </FlexView>
        <TextBar
          style={{ backgroundColor: 'transparent', padding: '2.5px 0px' }}
          title={'上架日期'}
          content={apartment.createdAt}
          titleClassName={classNames('apartment-card__text', {
            'apartment-card__text-highlight':
              !activeKey && dayjs(apartment.createdAt).isAfter(dayjs().add(-1, 'day')),
          })}
          contentClassName={classNames('apartment-card__content', {
            'apartment-card__text-highlight':
              !activeKey && dayjs(apartment.createdAt).isAfter(dayjs().add(-1, 'day')),
          })}
        />
        {apartment.distance && (
          <TextBar
            className={'apartment-card__text-bar-container'}
            title={'距离'}
            content={apartment.distance.toFixed(0) + 'm'}
            titleClassName={classNames('apartment-card__text', {
              'apartment-card__text-highlight': !activeKey && apartment.distance <= 100,
            })}
            contentClassName={classNames('apartment-card__content', {
              'apartment-card__text-highlight': !activeKey && apartment.distance <= 100,
            })}
          />
        )}
        <TextBar
          className={'apartment-card__text-bar-container'}
          title={'价格'}
          content={apartment.price + UNITS.CNY}
          titleClassName={classNames('apartment-card__text', {
            'apartment-card__text-highlight': activeKey === 'price',
          })}
          contentClassName={classNames('apartment-card__content', {
            'apartment-card__text-highlight': activeKey === 'price',
          })}
        />
        <TextBar
          className={'apartment-card__text-bar-container'}
          title={'面积'}
          content={apartment.area + UNITS.squreMeter}
          titleClassName={classNames('apartment-card__text', {
            'apartment-card__text-highlight': activeKey == 'area',
          })}
          contentClassName={classNames('apartment-card__content', {
            'apartment-card__text-highlight': activeKey == 'area',
          })}
        />
        <TextBar
          className={'apartment-card__text-bar-container'}
          title={'每平米价格'}
          content={apartment.pricePerSquareMeter + UNITS.pricePerSquareMeter}
          titleClassName={classNames('apartment-card__text', {
            'apartment-card__text-highlight': activeKey === 'pricePerSquareMeter',
          })}
          contentClassName={classNames('apartment-card__content', {
            'apartment-card__text-highlight': activeKey === 'pricePerSquareMeter',
          })}
        />
        {/* <Text className={classNames('apartment-card__text')} style={{ flex: 0.25, ...textStyle }}>
          {apartment.price + UNITS.CNY}
        </Text>
        <Text className={classNames('apartment-card__text')} style={{ flex: 0.2, ...textStyle }}>
          {apartment.area + UNITS.squreMeter}
        </Text>
        <Text className={classNames('apartment-card__text')} style={{ flex: 0.25, ...textStyle }}>
          {apartment.pricePerSquareMeter + UNITS.pricePerSquareMeter}
        </Text> */}
      </FlexView>
    </FlexView>
  );
};
