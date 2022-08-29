import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import { Type } from '@sinclair/typebox';
import Fastify from 'fastify';
import path from 'path';

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { FastifyServerOptions } from 'fastify';

export const createServer = async (options?: FastifyServerOptions) => {
  const fastify = Fastify(options).withTypeProvider<TypeBoxTypeProvider>();

  await fastify.register(fastifyStatic, {
    root: path.resolve(__dirname, '..', 'data'),
    prefix: '/data',
  });
  await fastify.register(import('@fastify/cookie'));
  await fastify.register(import('@fastify/sensible'));
  await fastify.register(import('@fastify/multipart'));
  await fastify.register(import('./plugins'));
  await fastify.register(import('./modules'), { prefix: '/api' });
  await fastify.register(fastifyCors, {
    origin: fastify.config.CORS_ORIGIN,
    credentials: true,
  });

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
