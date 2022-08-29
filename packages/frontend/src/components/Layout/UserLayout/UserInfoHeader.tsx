import { createStyles, Group, Text } from '@mantine/core';

import { UserAvatar } from '@/components/shared/UserAvatar';

import type { User } from '@/types';

const useStyles = createStyles(theme => ({
  wrapper: {
    height: 165,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 310,
  },
  userDisplayName: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

type UserInfoHeaderProps = Readonly<{
  user: User;
}>;

export const UserInfoHeader = ({ user }: UserInfoHeaderProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Group noWrap>
        <UserAvatar user={user} size="lg" />
        <div>
          <Text size={30} weight={700} className={classes.userDisplayName}>
            {user.displayName}
          </Text>
          <Text size="xs" color="dimmed">
            @{user.username}
          </Text>
        </div>
      </Group>
    </div>
  );
};
