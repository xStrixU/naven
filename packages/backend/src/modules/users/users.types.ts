import type { User } from '@prisma/client';

export type AppUser = User & { profilePictureURL: string };
