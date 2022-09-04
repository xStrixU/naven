import bcrypt from 'bcrypt';

import { mapUserToAppUser } from '../users/users.mapper';
import { SESSION_COOKIE_NAME } from './sessions.constans';

import type {
  createSessionSchema,
  deleteCurrentSessionSchema,
  getCurrentSessionSchema,
} from '@naven/common';

import type { TypeBoxRouteHandlerMethod } from '@/types/types.routes';

export const createSession: TypeBoxRouteHandlerMethod<
  typeof createSessionSchema
> = async (request, reply) => {
  const {
    session,
    body: { login, password },
    server: { prisma },
  } = request;

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: login }, { email: login }],
    },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return reply.unauthorized('Invalid username, email or password');
  }

  session.userId = user.id;

  return reply.status(201).send(mapUserToAppUser(user));
};

export const getCurrentSession: TypeBoxRouteHandlerMethod<
  typeof getCurrentSessionSchema
> = (request, reply) => {
  void reply.send(request.user);
};

export const deleteCurrentSession: TypeBoxRouteHandlerMethod<
  typeof deleteCurrentSessionSchema
> = async (request, reply) => {
  await request.session.destroy();

  return reply.clearCookie(SESSION_COOKIE_NAME).status(204).send();
};
