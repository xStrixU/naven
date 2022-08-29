import { Container, Paper, Title } from '@mantine/core';

import { useStyles } from './EntryPageLayout.styles';

import { PrivateRoute } from '@/components/shared/PrivateRoute';

import type { ReactNode } from 'react';

type EntryPageLayoutProps = Readonly<{
  title: string;
  children: ReactNode;
}>;

export const EntryPageLayout = ({ title, children }: EntryPageLayoutProps) => {
  const { classes } = useStyles();

  return (
    <PrivateRoute loggedIn={false}>
      <Container size={450} className={classes.wrapper}>
        <Title align="center" weight={900}>
          {title}
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {children}
        </Paper>
      </Container>
    </PrivateRoute>
  );
};
