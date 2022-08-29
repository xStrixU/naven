export const INDEX_PATH = '/';

export const SIGN_IN_PATH = '/sign-in';
export const SIGN_UP_PATH = '/sign-up';

export const ACCOUNT_PATH = '/account';

export const USER_BASE_PATH = '/user';
export const userPath = (username: string, path = '/') =>
  `${USER_BASE_PATH}/${username}${path}`;
