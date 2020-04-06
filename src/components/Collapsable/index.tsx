import React, { useState } from 'react';
import Assets from '@/assets';
import { View, Text, Image } from '@tarojs/components';
import classNames from 'classnames';
import './styles.scss';

interface IProps {
  title?: string;
  renderHeader?: (collapse: boolean) => JSX.Element | null;
  children?: React.ReactChild | null;
}

const Collapsable = ({ title, renderHeader, children }: IProps) => {
  const [collapse, setCollapse] = useState<boolean>(true);

  const openCloseEditor = () => {
    setCollapse(!collapse);
  };
  return (
    <View>
      {renderHeader ? (
        renderHeader(collapse)
      ) : (
        <View onClick={openCloseEditor} className={'collapse__header'}>
          <React.Fragment>
            <Text>{title}</Text>
            <Image
              className={classNames('collapse__arrow-icon', {
                'collapse__arrow-icon-open': !collapse,
              })}
              src={Assets.ArrowRight}
            />
          </React.Fragment>
        </View>
      )}
      {!collapse && children}
    </View>
  );
};
export default Collapsable;
