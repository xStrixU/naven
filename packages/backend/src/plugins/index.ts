import fp from 'fastify-plugin';

import type { FastifyPluginAsync } from 'fastify';

const plugins: FastifyPluginAsync = async fastify => {
  await fastify.register(import('./env'));
};

export default fp(plugins);
