import * as React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink } from 'mdbreact';

interface HeaderProps {
  title: string;
}

class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <Navbar color="indigo" dark={true} expand="lg">
        <NavbarBrand href="/">
          <strong>{this.props.title}</strong>
        </NavbarBrand>
        <NavbarNav>
          <NavItem active={true}>
            <NavLink className="nav-link" to="/">Current</NavLink>
          </NavItem>
        </NavbarNav>
      </Navbar>
    );
  }
}

export default Header;
