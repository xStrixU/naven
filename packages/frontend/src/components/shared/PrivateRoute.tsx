import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useUser } from '@/hooks/useUser';
import { INDEX_PATH, SIGN_IN_PATH } from '@/lib/paths';

import type { ReactNode } from 'react';

type PrivateRouteProps = Readonly<{
  loggedIn?: boolean;
  children: ReactNode | ReactNode[];
}>;

export const PrivateRoute = ({
  loggedIn = true,
  children,
}: PrivateRouteProps) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && loggedIn !== !!user) {
      void router.replace(loggedIn ? SIGN_IN_PATH : INDEX_PATH);
    }
  }, [isLoading, loggedIn, router, user]);

  if (isLoading || loggedIn !== !!user) {
    return null;
  }

  return <>{children}</>;
};
