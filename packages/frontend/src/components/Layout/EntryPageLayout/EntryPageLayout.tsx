import { Container, Paper, Title } from '@mantine/core';

import { useStyles } from './EntryPageLayout.styles';

import type { ReactNode } from 'react';

type EntryPageLayoutProps = Readonly<{
  title: string;
  children: ReactNode;
}>;

export const EntryPageLayout = ({ title, children }: EntryPageLayoutProps) => {
  const { classes } = useStyles();

  return (
    <Container size={450} className={classes.wrapper}>
      <Title align="center" weight={900}>
        {title}
      </Title>
      <Paper component="form" withBorder shadow="md" p={30} mt={30} radius="md">
        {children}
      </Paper>
    </Container>
  );
};
