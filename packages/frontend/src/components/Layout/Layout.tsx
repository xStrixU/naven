import { useRouter } from 'next/router';

import { MainLayout } from './MainLayout';

import type { ComponentType, ReactNode } from 'react';

type LayoutProps = Readonly<{
  children: ReactNode;
}>;

const layouts: Record<
  string,
  ComponentType<{ readonly children: ReactNode }>
> = {};

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter();

  const layoutKey = Object.keys(layouts).find(path =>
    pathname.startsWith(path)
  );
  const CurrentLayout = layoutKey ? layouts[layoutKey] : MainLayout;

  return <CurrentLayout>{children}</CurrentLayout>;
};
