import { PROFILE_PICTURES_BASE_PATH } from './users.constants';

import { downloadImage } from '@/utils/image';

const ALLOWED_PROFILE_PICUTRE_MIME_TYPES = ['image/png', 'image/jpeg'];

export const getProfilePicutrePath = (username: string) =>
  `${PROFILE_PICTURES_BASE_PATH}/${username}.png`;

export const createProfilePicture = async (
  displayName: string,
  username: string
) => {
  const randomColor = Math.floor(Math.random() * 0xffffff).toString(16);
  const url = `https://ui-avatars.com/api/?name=${displayName}&bold=true&length=1&rounded=true&background=${randomColor}`;

  await downloadImage(url, getProfilePicutrePath(username));
};

export const isProfilePictureMimeTypeAllowed = (mimetype: string) =>
  ALLOWED_PROFILE_PICUTRE_MIME_TYPES.includes(mimetype);
