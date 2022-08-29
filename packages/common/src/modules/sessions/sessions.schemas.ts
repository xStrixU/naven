import { Type } from '@sinclair/typebox';

import { User } from '../users';

import { createTypeBoxFastifySchema } from '@/utils';

export const createSessionSchema = createTypeBoxFastifySchema({
  body: Type.Object({
    login: Type.String(),
    password: Type.String(),
  }),
  response: {
    201: User,
  },
});

export const getCurrentSessionSchema = createTypeBoxFastifySchema({
  response: {
    200: User,
  },
});

export const deleteCurrentSessionSchema = createTypeBoxFastifySchema({
  response: {
    204: Type.Undefined(),
  },
});
