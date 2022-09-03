import type { FastifyPluginAsync } from 'fastify';

const modules: FastifyPluginAsync = async fastify => {
  await fastify.register(import('./sessions/sessions.plugins'));

  await fastify.register(import('./sessions/sessions.decorators'));
  await fastify.register(import('./users/users.decorators'));

  await fastify.register(import('./users/users.routes'), { prefix: '/users' });
  await fastify.register(import('./sessions/sessions.routes'), {
    prefix: '/sessions',
  });

  await fastify.register(import('./workspaces/workspaces.routes'), {
    prefix: '/workspaces',
  });
};

export default modules;
