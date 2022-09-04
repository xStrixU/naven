import bcrypt from 'bcrypt';

import { getEnv } from '@/lib/env';
import { downloadImage } from '@/lib/image';

import type { User } from '@prisma/client';

const PROFILE_PICTURES_BASE_PATH = 'data/profile-pictures';

const ALLOWED_PROFILE_PICUTRE_MIME_TYPES = ['image/png', 'image/jpeg'];

export const getProfilePicutrePath = ({ username }: User, url = false) => {
  const prefix = url ? `${getEnv('SERVER_BASE_URL')}/` : '';

  return `${prefix}${PROFILE_PICTURES_BASE_PATH}/${username}.png`;
};

export const createProfilePicture = async (user: User) => {
  const randomColor = Math.floor(Math.random() * 0xffffff).toString(16);
  const url = `https://ui-avatars.com/api/?name=${user.displayName}&bold=true&length=1&rounded=true&background=${randomColor}`;

  await downloadImage(url, getProfilePicutrePath(user));
};

export const isProfilePictureMimeTypeAllowed = (mimetype: string) =>
  ALLOWED_PROFILE_PICUTRE_MIME_TYPES.includes(mimetype);

export const hashPassword = (password: string) => {
  const passwordSaltOrRounds = getEnv('PASSWORD_SALT_OR_ROUNDS');

  return bcrypt.hash(
    password,
    isNaN(Number(passwordSaltOrRounds))
      ? passwordSaltOrRounds
      : Number(passwordSaltOrRounds)
  );
};
