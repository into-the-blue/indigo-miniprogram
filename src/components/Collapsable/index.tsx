import React, { useState } from 'react';
import Assets from '@/assets';
import { View, Image } from '@tarojs/components';
import classNames from 'classnames';
import './styles.scss';
import { Text } from '@/components';
import { FlexView } from '../FlexView';

interface IProps {
  title?: string;
  renderHeader?: (collapse: boolean) => JSX.Element | null;
  children?: React.ReactChild | null;
  className?: string;
  style?: React.CSSProperties;
}

const Collapsable = ({ title, renderHeader, children, className, style }: IProps) => {
  const [collapse, setCollapse] = useState<boolean>(true);

  const openCloseEditor = () => {
    setCollapse(!collapse);
  };
  return (
    <FlexView column className={className} style={{ backgroundColor: '#eee', ...style }}>
      {renderHeader ? (
        renderHeader(collapse)
      ) : (
        <FlexView
          onClick={openCloseEditor}
          className={classNames('collapse__header', {
            'collapse__header-collapsed': collapse,
          })}
        >
          <React.Fragment>
            <Text>{title}</Text>
            <Image
              className={classNames('collapse__arrow-icon', {
                'collapse__arrow-icon-open': !collapse,
              })}
              src={Assets.ArrowRight}
            />
          </React.Fragment>
        </FlexView>
      )}
      {!collapse && children}
    </FlexView>
  );
};
export default Collapsable;
