import * as React from 'react';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => (
  <header>
    {title}
  </header>
);

export default Header;
