import { getProfilePicutrePath } from './users.utils';

import type { User } from '@prisma/client';

export type AppUser<T extends User> = T & { profilePictureURL: string };

export const mapUserToAppUser = <T extends User>(user: T): AppUser<T> => ({
  ...user,
  profilePictureURL: getProfilePicutrePath(user),
});
