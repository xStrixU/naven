import bcrypt from 'bcrypt';
import fp from 'fastify-plugin';

import { PROFILE_PICTURES_BASE_PATH } from './users.constants';

import type { AppUser } from './users.types';
import type { PrismaClient, User } from '@prisma/client';
import type { FastifyInstance, FastifyPluginCallback } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    getUserBy: ReturnType<typeof getUserBy>;
    createAppUser: ReturnType<typeof createAppUser>;
    hashPassword: ReturnType<typeof hashPassword>;
  }
}

const getUserBy =
  (prisma: PrismaClient) =>
  async (data: { [P in keyof AppUser]: AppUser[P] }) => {
    return await prisma.user.findFirst({
      where: {
        ...data,
      },
    });
  };

const createAppUser =
  (fastify: FastifyInstance) =>
  (user: User): AppUser => {
    const {
      config: { SERVER_BASE_URL },
    } = fastify;

    return {
      ...user,
      profilePictureURL: `${SERVER_BASE_URL}/${PROFILE_PICTURES_BASE_PATH}/${user.username}.png`,
    };
  };

const hashPassword = (fastify: FastifyInstance) => (password: string) => {
  const { PASSWORD_SALT_OR_ROUNDS } = fastify.config;

  return bcrypt.hash(
    password,
    isNaN(Number(PASSWORD_SALT_OR_ROUNDS))
      ? PASSWORD_SALT_OR_ROUNDS
      : Number(PASSWORD_SALT_OR_ROUNDS)
  );
};

const usersDecorators: FastifyPluginCallback = (fastify, _options, done) => {
  fastify.decorate('getUserBy', getUserBy);
  fastify.decorate('createAppUser', createAppUser(fastify));
  fastify.decorate('hashPassword', hashPassword(fastify));

  done();
};

export default fp(usersDecorators);
