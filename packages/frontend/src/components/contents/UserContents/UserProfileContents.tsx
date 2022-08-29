import { UserLayout } from '@/components/Layout/UserLayout/UserLayout';

import type { User } from '@/types';

type UserProfileContentsProps = Readonly<{
  user: User;
}>;

export const UserProfileContent = ({ user }: UserProfileContentsProps) => {
  return (
    <UserLayout user={user}>
      <span>User Info Contents</span>
    </UserLayout>
  );
};
