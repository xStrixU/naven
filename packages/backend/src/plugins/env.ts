import { Type } from '@sinclair/typebox';
import fp from 'fastify-plugin';

import type { Static } from '@sinclair/typebox';
import type { FastifyPluginAsync } from 'fastify';

const schema = Type.Object({
  HOST: Type.String({ default: '127.0.0.1' }),
  PORT: Type.Number({ default: 3000 }),
  SERVER_BASE_URL: Type.String({ default: 'http://localhost:3000' }),
  PASSWORD_SALT_OR_ROUNDS: Type.Union([Type.String(), Type.Number()], {
    default: 10,
  }),
  SESSION_SECRET: Type.String({ default: 'FaLo2p4Ngx9EAQFEHpHgneZjlcCK32Yv' }),
  CORS_ORIGIN: Type.String({ default: 'http://localhost:3000' }),
});

declare module 'fastify' {
  interface FastifyInstance {
    config: Static<typeof schema>;
  }
}

const envPlugin: FastifyPluginAsync = async fastify => {
  await fastify.register(import('@fastify/env'), { schema, dotenv: true });
};

export default fp(envPlugin);
