import fp from 'fastify-plugin';

import { mapUserToAppUser } from '../users/users.mapper';

import type { AppUser } from '../users/users.mapper';
import type { User, Workspace, WorkspacesUsers } from '@prisma/client';
import type {
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
  preHandlerHookHandler,
} from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user: AppUser<
      User & {
        workspaces: (WorkspacesUsers & {
          user: User;
          workspace: Workspace;
        })[];
      }
    >;
  }

  interface FastifyInstance {
    auth: preHandlerHookHandler;
  }
}

const auth = async (request: FastifyRequest, reply: FastifyReply) => {
  const {
    session: { userId },
    server: { prisma },
  } = request;

  if (!userId) {
    return reply.unauthorized();
  }

  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: {
      workspaces: {
        include: {
          user: true,
          workspace: true,
        },
      },
    },
  });

  if (!user) {
    return reply.internalServerError();
  }

  request.user = mapUserToAppUser(user);
};

const sessionsDecorators: FastifyPluginCallback = (fastify, _options, done) => {
  fastify.decorateRequest('user', null);
  fastify.decorate('auth', auth);

  done();
};

export default fp(sessionsDecorators);
