import { createStyles, Header as MantineHeader } from '@mantine/core';

import { UserProfileIcon } from './UserProfileIcon';

const useStyles = createStyles(() => ({
  header: {
    height: 60,
    display: 'flex',
    alignItems: 'center',
  },
}));

export const Header = () => {
  const { classes } = useStyles();

  return (
    <MantineHeader height={56} className={classes.header}>
      <UserProfileIcon />
    </MantineHeader>
  );
};
