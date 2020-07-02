import React from 'react';
import { IMemberInfo } from '@/types';
import { FlexView, TextBar, Text } from '@/components';
import './styles.scss';
import { mapMemberType } from './helper';
import dayjs from 'dayjs';

interface IProps {
  info: IMemberInfo | null;
}

export const MemberInfo = ({ info }: IProps) => {
  const expired = info ? dayjs().isAfter(dayjs(info.expireAt)) : false;
  return (
    <FlexView column>
      <Text className={'member-info__title strong'}>{'会员:'}</Text>

      <FlexView className={'member-info__container'}>
        {!info && (
          <Text className={'member-info__placeholder'}>{'还没有会员? 快去领取免费会员吧~'}</Text>
        )}
        {info && (
          <React.Fragment>
            <FlexView column marginRight={15}>
              <Text className={'member-info__member-type'}>{mapMemberType(info.type)}</Text>
            </FlexView>
            <FlexView className={'member-info__divider'} />
            <FlexView column style={{ flex: 1 }}>
              <TextBar
                title={'有效期至'}
                content={dayjs(info.expireAt).format('YYYY MM DD') + (expired ? ' 已过期' : '')}
                contentStyle={expired ? { color: '#Ef5350' } : undefined}
              />
              <TextBar title={'订阅额度'} content={info.subscriptionQuota} />
            </FlexView>
          </React.Fragment>
        )}
      </FlexView>
    </FlexView>
  );
};
