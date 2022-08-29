import { Menu } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { IconLogout, IconUser } from '@tabler/icons';

import { UserAvatar } from '@/components/shared/UserAvatar';

import { useUser } from '@/hooks/useUser';
import { ACCOUNT_PATH } from '@/lib/paths';

export const UserProfileIcon = () => {
  const { user, logoutMutation } = useUser();

  if (!user) return null;

  return (
    <Menu shadow="md" width={180}>
      <Menu.Target>
        <UserAvatar user={user} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={NextLink}
          href={ACCOUNT_PATH}
          icon={<IconUser size={14} />}
        >
          Manage account
        </Menu.Item>
        <Menu.Item
          icon={<IconLogout size={14} stroke={1.5} />}
          onClick={() => logoutMutation.mutate()}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
