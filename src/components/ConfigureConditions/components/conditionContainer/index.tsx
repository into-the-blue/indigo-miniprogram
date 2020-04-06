import React, { useState } from 'react';
import { AtSwipeAction } from 'taro-ui';
import { SwipeActionOption } from 'taro-ui/types/swipe-action';

const Wrapper: <P extends object>(
  Comp: React.ComponentType<P>,
) => (props: { onDeleteCondition } & P) => JSX.Element = (Comp) => (props) => {
  const { onDeleteCondition, ...restProps } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [secConfirm, setSecConfirm] = useState<boolean>(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClickOption = (item: SwipeActionOption, index: number) => {
    console.warn('index', index);
    if (item.text === '删除') {
      setSecConfirm(true);
      setIsOpen(true);
      return;
    }
    if (item.text === '确认删除') {
      // delete condition
    }
  };
  const onSwipeClose = () => {
    console.warn('on close', isOpen, secConfirm);
    setSecConfirm(false);
    setIsOpen(false);
  };
  const onSwipeOpen = () => {
    console.warn('on open', isOpen, secConfirm);
    setSecConfirm(false);
    setIsOpen(true);
  };
  return (
    <AtSwipeAction
      options={
        secConfirm
          ? [
              {
                text: '确认删除',
                style: {
                  width: '60px',
                  backgroundColor: '#f44336',
                },
              },
            ]
          : [
              {
                text: '删除',
                style: {
                  backgroundColor: '#ff9800',
                  width: '30px',
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
