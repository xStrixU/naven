import { Avatar } from '@mantine/core';
import { forwardRef } from 'react';

import { useUser } from '@/hooks/useUser';
import { useUserContext } from '@/providers/UserProvider';

import type { AvatarProps } from '@mantine/core';

import type { User } from '@/types';

type UserAvatarProps = Readonly<{
  user: User;
}> &
  AvatarProps;

export const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
  ({ user, sx, ...props }, ref) => {
    const { user: currentUser } = useUser();
    const { profilePictureTimestamp } = useUserContext();

    const alt = `${user.displayName} (${user.username})`;

    return (
      <Avatar
        src={`${user.profilePictureURL}${
          currentUser?.id === user.id ? `?${profilePictureTimestamp}` : ''
        }`}
        alt={alt}
        title={alt}
        sx={{ cursor: 'pointer', borderRadius: '50%', ...sx }}
        ref={ref}
        {...props}
      />
    );
  }
);

UserAvatar.displayName = 'UserAvatar';
