import fp from 'fastify-plugin';

import type { FastifyPluginAsync } from 'fastify';

const plugins: FastifyPluginAsync = async fastify => {
  await fastify.register(import('./prisma'));
};

export default fp(plugins);
