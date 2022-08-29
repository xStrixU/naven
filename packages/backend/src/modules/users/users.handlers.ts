import bcrypt from 'bcrypt';

import {
  createProfilePicture,
  getProfilePicutrePath,
  isProfilePictureMimeTypeAllowed,
} from './users.utils';

import { PrismaErrorCode } from '@/plugins/prisma/prisma.types';
import { isPrismaError } from '@/plugins/prisma/prisma.utils';
import { saveFile } from '@/utils/stream';

import type {
  createUserSchema,
  deleteCurrentUserProfilePictureSchema,
  deleteCurrentUserSchema,
  getUsersSchema,
  patchCurrentUserSchema,
  updateCurrentUserEmailSchema,
  updateCurrentUserPasswordSchema,
} from '@naven/common';
import type { RouteHandlerMethod } from 'fastify';

import type { TypeBoxRouteHandlerMethod } from '@/types';

export const getUsers: TypeBoxRouteHandlerMethod<
  typeof getUsersSchema
> = async (request, _reply) => {
  const { createAppUser, prisma } = request.server;
  const { username } = request.query;

  const users = await prisma.user.findMany({
    where: {
      username,
    },
  });

  return users.map(createAppUser);
};

export const createUser: TypeBoxRouteHandlerMethod<
  typeof createUserSchema
> = async (request, reply) => {
  const { prisma } = request.server;
  const { username, email, password } = request.body;

  const emailUsername = email.split('@')[0];
  const displayName =
    emailUsername.charAt(0).toUpperCase() + emailUsername.slice(1);
  const hashedPassword = await request.server.hashPassword(password);

  try {
    await createProfilePicture(displayName, username);

    const user = await prisma.user.create({
      data: {
        username,
        displayName,
        email,
        password: hashedPassword,
      },
    });

    request.session.userId = user.id;

    return reply.status(201).send(request.server.createAppUser(user));
  } catch (err) {
    if (isPrismaError(err) && err.code === PrismaErrorCode.UniqueKeyViolation) {
      return reply.conflict('username or email are already registered');
    }

    throw err;
  }
};

export const patchCurrentUser: TypeBoxRouteHandlerMethod<
  typeof patchCurrentUserSchema
> = async (request, _reply) => {
  const {
    user,
    server: { prisma, createAppUser },
  } = request;

  const newUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: request.body,
  });

  return createAppUser(newUser);
};

export const updateCurrentUserProfilePicutre: RouteHandlerMethod = async (
  request,
  reply
) => {
  const profilePicture = await request.file();
  const user = request.user;

  if (!isProfilePictureMimeTypeAllowed(profilePicture.mimetype)) {
    return reply.badRequest('Invalid MIME type');
  }

  await saveFile(profilePicture.file, getProfilePicutrePath(user.username));

  return user;
};

export const deleteCurrentUserProfilePicture: TypeBoxRouteHandlerMethod<
  typeof deleteCurrentUserProfilePictureSchema
> = async (request, reply) => {
  const { user } = request;

  await createProfilePicture(user.displayName, user.username);

  return reply.status(204).send();
};

export const updateCurrentUserEmail: TypeBoxRouteHandlerMethod<
  typeof updateCurrentUserEmailSchema
> = async (request, reply) => {
  const {
    user,
    body: { newEmail, password },
    server: { prisma, createAppUser },
  } = request;

  if (!(await bcrypt.compare(password, user.password))) {
    return reply.unauthorized('Invalid password');
  }

  const userWithNewEmail = await prisma.user.findFirst({
    where: {
      email: newEmail,
    },
  });

  if (userWithNewEmail) {
    return reply.conflict('Email is already registered');
  }

  const newUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      email: newEmail,
    },
  });

  return createAppUser(newUser);
};

export const updateCurrentUserPassword: TypeBoxRouteHandlerMethod<
  typeof updateCurrentUserPasswordSchema
> = async (request, reply) => {
  const {
    user,
    body: { currentPassword, newPassword },
    server: { prisma, hashPassword },
  } = request;

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return reply.unauthorized('Invalid current password');
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: await hashPassword(newPassword),
    },
  });

  return reply.status(204).send();
};

export const deleteCurrentUser: TypeBoxRouteHandlerMethod<
  typeof deleteCurrentUserSchema
> = async (request, reply) => {
  const {
    user,
    body: { password },
    server: { prisma },
  } = request;

  if (!(await bcrypt.compare(password, user.password))) {
    return reply.unauthorized('Invalid password');
  }

  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });

  return reply.status(204).send();
};
