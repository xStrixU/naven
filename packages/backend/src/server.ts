import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import { Type } from '@sinclair/typebox';
import ajvErrors from 'ajv-errors';
import Fastify from 'fastify';
import path from 'path';

import { getEnv } from './lib/env';

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

export const createServer = async () => {
  const fastify = Fastify({
    ajv: {
      customOptions: {
        allErrors: true,
      },
      plugins: [ajvErrors],
    },
    logger: true,
  }).withTypeProvider<TypeBoxTypeProvider>();

  await fastify.register(fastifyStatic, {
    root: path.resolve(__dirname, '..', 'data'),
    prefix: '/data',
  });
  await fastify.register(fastifyCors, {
    origin: getEnv('CORS_ORIGIN'),
    credentials: true,
  });
  await fastify.register(import('@fastify/cookie'));
  await fastify.register(import('@fastify/sensible'));
  await fastify.register(import('@fastify/multipart'));
  await fastify.register(import('./plugins'));
  await fastify.register(import('./modules'), { prefix: '/api' });

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
