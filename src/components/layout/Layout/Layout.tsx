import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Header } from '../';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => (
  <div className="app-layout">
    <Header title="Exchange Rates" />
    {children}
  </div>
);

export default withRouter(Layout);
