import { Box, createStyles } from '@mantine/core';

import { Header } from '../Header/Header';
import { UserInfoHeader } from './UserInfoHeader';
import { UserNavbar } from './UserNavbar/UserNavbar';

import type { ReactNode } from 'react';

import type { User } from '@/types';

const useStyles = createStyles(() => ({
  wrapper: {
    background: 'white',
    display: 'flex',
    justifyContent: 'center',
  },
}));

type UserLayoutProps = Readonly<{
  user: User;
  children: ReactNode;
}>;

export const UserLayout = ({ user, children }: UserLayoutProps) => {
  const { classes } = useStyles();

  return (
    <>
      <Header />
      <UserInfoHeader user={user} />
      <UserNavbar />
      <Box component="div" className={classes.wrapper}>
        {children}
      </Box>
    </>
  );
};
