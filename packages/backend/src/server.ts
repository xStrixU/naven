import { Type } from '@sinclair/typebox';
import Fastify from 'fastify';

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { FastifyServerOptions } from 'fastify';

export const createServer = async (options?: FastifyServerOptions) => {
  const fastify = Fastify(options).withTypeProvider<TypeBoxTypeProvider>();

  await fastify.register(import('./plugins'));

  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: Type.String(),
        },
      },
    },
    (_request, reply) => {
      void reply.send('Naven API');
    }
  );

  return fastify;
};
