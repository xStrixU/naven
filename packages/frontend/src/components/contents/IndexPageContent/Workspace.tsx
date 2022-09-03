import { createStyles, Paper, Text } from '@mantine/core';

type WorkspaceProps = Readonly<{
  name: string;
}>;

const useStyles = createStyles(() => ({
  wrapper: {
    maxWidth: 270,
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
  },
}));

export const Workspace = ({ name }: WorkspaceProps) => {
  const { classes } = useStyles();

  return (
    <Paper shadow="md" radius="md" className={classes.wrapper}>
      <Text weight={600} size={17}>
        {name}
      </Text>
    </Paper>
  );
};
