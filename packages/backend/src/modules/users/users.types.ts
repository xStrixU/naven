import type { User } from '@prisma/client';

export type AppUser<T extends User> = T & { profilePictureURL: string };
