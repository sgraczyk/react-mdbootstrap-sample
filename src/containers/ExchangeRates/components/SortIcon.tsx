import * as React from 'react';
import { Fa } from 'mdbreact';

interface SortIconProps {
  isAscending: boolean;
}

const SortIcon = ({ isAscending }: SortIconProps) => {
  const icon = isAscending
    ? 'angle-double-up'
    : 'angle-double-down';
  return (
    <Fa icon={icon} />
  );
};

export default SortIcon;
