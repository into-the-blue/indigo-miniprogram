import React from 'react';
import { View } from '@tarojs/components';

type ReactText = string | number;
type ReactChild = React.ReactElement<unknown> | ReactText;

interface ChildrenArray extends Array<Children> {}
type ReactFragment = ChildrenArray;
type Children = ReactChild | ReactFragment | boolean | null | undefined;
interface IProps {
  column?: boolean;
  children?: Children;
  style?: React.CSSProperties;
  className?: string;
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justifyContent?: 'start' | 'end' | 'space-between' | 'space-evenly' | 'space-around';
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
    if (key.includes('Horizontal')) {
      const value = paddingMargins[key];
      const extractKey = /(padding|margin)([a-zA-Z]+)/;
      const styleType = extractKey.exec(key)![1];
      const orient = extractKey.exec(key)![2];
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
    }
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
  ...paddingMargin
}: IProps) => {
  const getStyle = () => {
    const basicStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: column ? 'column' : 'row',
      boxSizing: 'border-box',
      minWidth: 0,
      minHeight: 0,
      alignItems,
      justifyContent,
    };

    return {
      ...basicStyle,
      ...style,
      ...getMarginPadding(paddingMargin),
    };
  };
  return (
    <View style={getStyle()} className={className}>
      {children}
    </View>
  );
};
