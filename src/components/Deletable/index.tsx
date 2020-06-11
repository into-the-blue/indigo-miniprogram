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
    if (item.text === '删除') {
      setSecConfirm(true);
      return;
    }
    if (item.text === '确认删除') {
      setIsOpen(false);
      setSecConfirm(false);
      setTimeout(onDelete, 0);
    }
  };
  const onSwipeClose = () => {
    setIsOpen(false);
  };
  const onSwipeOpen = () => {
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
