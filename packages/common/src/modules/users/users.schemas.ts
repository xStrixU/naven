import { Type } from '@sinclair/typebox';

import {
  USER_PASSWORD_REGEX,
  USER_PASSWORD_REGEX_MESSAGE,
  USER_USERNAME_REGEX,
  USER_USERNAME_REGEX_MESSAGE,
} from './users.constants';

import { createTypeBoxFastifySchema } from '@/utils';

export const User = Type.Object({
  id: Type.Number(),
  username: Type.String(),
  displayName: Type.String(),
  biography: Type.Union([Type.String(), Type.Null()]),
  email: Type.String(),
  profilePictureURL: Type.String(),
});

export const getUsersSchema = createTypeBoxFastifySchema({
  querystring: Type.Partial(
    Type.Object({
      username: Type.String(),
    })
  ),
  response: {
    200: Type.Array(User),
  },
});

export const createUserSchema = createTypeBoxFastifySchema({
  body: Type.Object({
    username: Type.RegEx(USER_USERNAME_REGEX, {
      errorMessage: USER_USERNAME_REGEX_MESSAGE,
    }),
    email: Type.String({ format: 'email' }),
    password: Type.RegEx(USER_PASSWORD_REGEX, {
      errorMessage: USER_PASSWORD_REGEX_MESSAGE,
    }),
  }),
  response: {
    201: User,
  },
});

export const patchCurrentUserSchema = createTypeBoxFastifySchema({
  body: Type.Partial(Type.Omit(User, ['id'])),
  response: {
    200: User,
  },
});

export const updateCurrentUserProfilePictureSchema = createTypeBoxFastifySchema(
  {
    response: {
      200: User,
    },
  }
);

export const deleteCurrentUserProfilePictureSchema = createTypeBoxFastifySchema(
  {
    response: {
      204: Type.Undefined(),
    },
  }
);

export const updateCurrentUserEmailSchema = createTypeBoxFastifySchema({
  body: Type.Object({
    newEmail: Type.String({ format: 'email' }),
    password: Type.String(),
  }),
  response: {
    200: User,
  },
});

export const updateCurrentUserPasswordSchema = createTypeBoxFastifySchema({
  body: Type.Object({
    currentPassword: Type.String(),
    newPassword: Type.RegEx(USER_PASSWORD_REGEX, {
      errorMessage: USER_PASSWORD_REGEX_MESSAGE,
    }),
  }),
  response: {
    204: Type.Undefined(),
  },
});

export const deleteCurrentUserSchema = createTypeBoxFastifySchema({
  body: Type.Object({
    password: Type.String(),
  }),
  response: {
    204: Type.Undefined(),
  },
});
