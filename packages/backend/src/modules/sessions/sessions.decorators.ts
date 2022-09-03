import fp from 'fastify-plugin';

import type { AppUser } from '../users/users.types';
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
    server: { prisma, createAppUser },
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

  request.user = createAppUser(user);
};

const sessionsDecorators: FastifyPluginCallback = (fastify, _options, done) => {
  fastify.decorate('auth', auth);

  done();
};

export default fp(sessionsDecorators);
