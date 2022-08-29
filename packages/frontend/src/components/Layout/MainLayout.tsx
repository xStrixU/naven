import { PrivateRoute } from '../shared/PrivateRoute';
import { Header } from './Header/Header';

import type { ReactNode } from 'react';

type MainLayoutProps = Readonly<{
  children: ReactNode;
}>;

export const MainLayout = ({ children }: MainLayoutProps) => (
  <PrivateRoute>
    <Header />
    {children}
  </PrivateRoute>
);
