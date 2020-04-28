import React from 'react';

interface IProps {
  children: React.ReactChild | React.ReactChild[];
  showPlaceholder: boolean;
  renderPlaceholder: () => JSX.Element;
}

const PlaceholderView = ({ children, showPlaceholder, renderPlaceholder }: IProps) => {
  if (!showPlaceholder) return <React.Fragment>{children}</React.Fragment>;
  return renderPlaceholder();
};

export default PlaceholderView;
