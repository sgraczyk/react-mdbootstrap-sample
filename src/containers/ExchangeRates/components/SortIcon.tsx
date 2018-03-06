import * as React from 'react';

interface SortIconProps {
  isAscending: boolean;
}

const SortIcon = ({ isAscending }: SortIconProps) => {
  const className = isAscending
    ? 'fa fa-angle-double-up'
    : 'fa fa-angle-double-down';
  return (
    <i className={className} />
  );
};

export default SortIcon;
