import React, { useState } from 'react';
import { AtSwipeAction } from 'taro-ui';
import { SwipeActionOption } from 'taro-ui/types/swipe-action';
import classNames from 'classnames';

const Deletable = ({
  onDelete,
  children,
  style,
  className,
}: {
  onDelete: () => void;
  children: React.ReactChild;
  className?: string | classNames;
  style?: React.CSSProperties;
}) => {
  const [secConfirm, setSecConfirm] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClickOption = (item: SwipeActionOption, index: number) => {
    console.warn('index', index);
    if (item.text === '删除') {
      setSecConfirm(true);
      return;
    }
    if (item.text === '确认删除') {
      setIsOpen(false);
      setSecConfirm(false);
      onDelete();
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
      customStyle={style}
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
      {children}
    </AtSwipeAction>
  );
};

export default Deletable;
