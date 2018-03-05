import * as React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink } from 'mdbreact';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps): JSX.Element => (
  <Navbar color="indigo" dark={true} expand="lg">
    <NavbarBrand href="/">
      <strong>{title}</strong>
    </NavbarBrand>
    <NavbarNav>
      <NavItem active={true}>
        <NavLink className="nav-link" to="/">Current</NavLink>
      </NavItem>
    </NavbarNav>
  </Navbar>
);

export default Header;
