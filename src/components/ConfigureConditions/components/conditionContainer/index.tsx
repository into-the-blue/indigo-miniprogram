import React, { useState } from 'react';
import { AtSwipeAction } from 'taro-ui';
import { SwipeActionOption } from 'taro-ui/types/swipe-action';

const Wrapper: <P extends object>(
  Comp: React.ComponentType<P>,
) => (
  props: { onDeleteCondition: () => void; className?: string } & P,
) => JSX.Element = Comp => props => {
  const { onDeleteCondition, className, ...restProps } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [secConfirm, setSecConfirm] = useState<boolean>(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClickOption = (item: SwipeActionOption, index: number) => {
    // console.warn('index', index);
    if (item.text === '删除') {
      setSecConfirm(true);
      return;
    }
    if (item.text === '确认删除') {
      setIsOpen(false);
      setSecConfirm(false);
      setTimeout(onDeleteCondition, 0);
      // delete condition
    }
  };
  const onSwipeClose = () => {
    console.warn('on close', isOpen);
    setIsOpen(false);
  };
  const onSwipeOpen = () => {
    console.warn('on open', isOpen);
    setIsOpen(true);
  };
  return (
    <AtSwipeAction
      className={className}
      options={
        secConfirm
          ? [
              {
                text: '确认删除',
                style: {
                  width: '60px',
                  backgroundColor: '#f44336',
                  color: 'white',
                },
              },
            ]
          : [
              {
                text: '删除',
                style: {
                  backgroundColor: '#ff9800',
                  width: '30px',
                  color: 'white',
                },
              },
            ]
      }
      isOpened={isOpen}
      onClick={onClickOption}
      onClosed={onSwipeClose}
      onOpened={onSwipeOpen}
    >
      <Comp {...(restProps as any)} />
    </AtSwipeAction>
  );
};

export default Wrapper;
