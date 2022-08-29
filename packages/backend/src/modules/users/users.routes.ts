import {
  createUserSchema,
  deleteCurrentUserProfilePictureSchema,
  deleteCurrentUserSchema,
  getUsersSchema,
  patchCurrentUserSchema,
  updateCurrentUserEmailSchema,
  updateCurrentUserPasswordSchema,
} from '@naven/common';

import {
  createUser,
  deleteCurrentUser,
  deleteCurrentUserProfilePicture,
  getUsers,
  patchCurrentUser,
  updateCurrentUserEmail,
  updateCurrentUserPassword,
  updateCurrentUserProfilePicutre,
} from './users.handlers';

import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';

const usersRoutes: FastifyPluginCallbackTypebox = (fastify, _options, done) => {
  fastify.get('/', { schema: getUsersSchema }, getUsers);
  fastify.post('/', { schema: createUserSchema }, createUser);
  fastify.patch(
    '/me',
    { schema: patchCurrentUserSchema, preHandler: fastify.auth },
    patchCurrentUser
  );
  fastify.put(
    '/me/profile-picture',
    {
      preHandler: fastify.auth,
    },
    updateCurrentUserProfilePicutre
  );
  fastify.delete(
    '/me/profile-picture',
    {
      schema: deleteCurrentUserProfilePictureSchema,
      preHandler: fastify.auth,
    },
    deleteCurrentUserProfilePicture
  );
  fastify.put(
    '/me/email',
    { schema: updateCurrentUserEmailSchema, preHandler: fastify.auth },
    updateCurrentUserEmail
  );
  fastify.put(
    '/me/password',
    { schema: updateCurrentUserPasswordSchema, preHandler: fastify.auth },
    updateCurrentUserPassword
  );
  fastify.post(
    '/me/delete',
    { schema: deleteCurrentUserSchema, preHandler: fastify.auth },
    deleteCurrentUser
  );
  done();
};

export default usersRoutes;
