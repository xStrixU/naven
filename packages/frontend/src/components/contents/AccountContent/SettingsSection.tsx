import { Box, createStyles, Divider, Text } from '@mantine/core';

import type { FormEvent, ReactNode } from 'react';

type SettingsSectionProps = Readonly<{
  title: string;
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}>;

const useStyles = createStyles(() => ({
  form: {
    marginBottom: 40,
    ':last-of-type': {
      marginBottom: 0,
    },
    '> *': {
      marginTop: 10,
    },
    '> button[type=submit]': {
      marginTop: 20,
    },
  },
}));

export const SettingsSection = ({
  title,
  children,
  onSubmit,
}: SettingsSectionProps) => {
  const { classes } = useStyles();

  return (
    <>
      <Text weight={600} size="xl" mb={5}>
        {title}
      </Text>
      <Divider />
      <Box
        component="form"
        mt={10}
        onSubmit={onSubmit}
        className={classes.form}
      >
        {children}
      </Box>
    </>
  );
};
