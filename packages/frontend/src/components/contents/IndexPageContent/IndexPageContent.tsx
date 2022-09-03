import { Container, createStyles, Divider, Paper, Text } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons';

import { Workspace } from './Workspace';

import { useWorkspaces } from '@/hooks/useWorkspaces';

const useStyles = createStyles(theme => ({
  wrapper: {
    maxWidth: 270,
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',

    '&:hover': {
      background: theme.colors.gray[0],
    },

    '&:active': {
      background: theme.colors.gray[1],
    },
  },
}));

export const IndexPageContent = () => {
  const { classes } = useStyles();
  const { workspaces } = useWorkspaces();

  return (
    <Container size="md" pt={40}>
      <Text weight={600} size="xl" mb={5}>
        Your workspaces (0)
      </Text>
      <Divider mb={25} />
      <Paper shadow="md" radius="md" className={classes.wrapper}>
        <Text weight={600} size={17}>
          Create new workspace
        </Text>
        <IconCirclePlus size={40} />
      </Paper>
      {workspaces.map(({ id, name }) => (
        <Workspace key={id} name={name} />
      ))}
    </Container>
  );
};
