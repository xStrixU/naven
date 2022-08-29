import fp from 'fastify-plugin';

import type {
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
  preHandlerHookHandler,
} from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    auth: preHandlerHookHandler;
  }
}

const auth = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = request.session;

  if (!userId) {
    return reply.unauthorized();
  }

  const user = await request.server.prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) {
    return reply.internalServerError();
  }

  request.user = request.server.createAppUser(user);
};

const sessionsDecorators: FastifyPluginCallback = (fastify, _options, done) => {
  fastify.decorate('auth', auth);

  done();
};

export default fp(sessionsDecorators);
