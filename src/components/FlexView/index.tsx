import React from 'react';
import { View, ITouchEvent } from '@tarojs/components';
import './styles.scss';
import classNames from 'classnames';

type ReactText = string | number;
type ReactChild = React.ReactElement<unknown> | ReactText;

interface ChildrenArray extends Array<Children> {}
type ReactFragment = ChildrenArray;
type Children = ReactChild | ReactFragment | boolean | null | undefined;
export interface IFlexViewProps {
  column?: boolean;
  children?: Children;
  style?: React.CSSProperties;
  className?: string;
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justifyContent?: 'start' | 'end' | 'space-between' | 'space-evenly' | 'space-around';
  wrap?: boolean;
  onClick?: (e: ITouchEvent) => void;

  neumorphism?: boolean;
  inset?: boolean;
  insetWhenActive?: boolean;

  padding?: string;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  paddingTop?: string | number;
  paddingBottom?: string | number;
  paddingVertical?: string | number;
  paddingHorizontal?: string | number;

  margin?: string;
  marginTop?: string | number;
  marginRight?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginVertical?: string | number;
  marginHorizontal?: string | number;
}

const getMarginPadding = (paddingMargins: any) => {
  const style = {};
  Object.keys(paddingMargins).forEach(key => {
    const value = paddingMargins[key];
    const extractKey = /(padding|margin)([a-zA-Z]*)/;
    const res = extractKey.exec(key);
    if (!res) return;
    const styleType = res[1];
    const orient = res[2];
    if (orient.toLowerCase() === 'vertical') {
      Object.assign(style, {
        [styleType + 'Top']: value,
        [styleType + 'Bottom']: value,
      });
      return;
    }
    if (orient.toLowerCase() === 'horizontal') {
      Object.assign(style, {
        [styleType + 'Left']: value,
        [styleType + 'Right']: value,
      });
      return;
    }
    Object.assign(style, {
      [key]: value,
    });
  });
  return style;
};

export const FlexView = ({
  children,
  style,
  column,
  className,
  alignItems,
  justifyContent,
  wrap,
  onClick,
  inset,
  insetWhenActive,
  neumorphism,
  ...paddingMargin
}: IFlexViewProps) => {
  const getStyle = () => {
    const basicStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: column ? 'column' : 'row',
      boxSizing: 'border-box',
      minWidth: 0,
      minHeight: 0,
      flexWrap: wrap ? 'wrap' : undefined,
      alignItems,
      justifyContent,
      // backgroundColor: '#eee',
    };
    return {
      ...basicStyle,
      ...style,
      ...getMarginPadding(paddingMargin),
    };
  };
  return (
    <View
      style={getStyle()}
      className={classNames(
        {
          'flex-view__default': true,
        },
        className,
        {
          'flex-view__neumorphism': neumorphism,
          'flex-view__inset-active': insetWhenActive,
          'flex-view__inset': inset,
        },
      )}
      onClick={onClick}
    >
      {children}
    </View>
  );
};
