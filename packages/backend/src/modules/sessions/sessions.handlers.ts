import bcrypt from 'bcrypt';

import { SESSION_COOKIE_NAME } from './sessions.constans';

import type {
  createSessionSchema,
  deleteCurrentSessionSchema,
  getCurrentSessionSchema,
} from '@naven/common';

import type { TypeBoxRouteHandlerMethod } from '@/types';

export const createSession: TypeBoxRouteHandlerMethod<
  typeof createSessionSchema
> = async (request, reply) => {
  const { login, password } = request.body;

  const user = await request.server.prisma.user.findFirst({
    where: {
      OR: [{ username: login }, { email: login }],
    },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return reply.unauthorized('Invalid username, email or password');
  }

  request.session.userId = user.id;

  return reply.status(201).send(request.server.createAppUser(user));
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
