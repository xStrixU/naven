import fastifySession from '@fastify/session';
import fp from 'fastify-plugin';

import { SESSION_COOKIE_NAME } from './sessions.constans';

import type { FastifyPluginAsync } from 'fastify';

declare module 'fastify' {
  interface Session {
    userId: number;
  }
}

const sessionsPlugins: FastifyPluginAsync = async fastify => {
  await fastify.register(fastifySession, {
    secret: fastify.config.SESSION_SECRET,
    cookieName: SESSION_COOKIE_NAME,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  });
};

export default fp(sessionsPlugins);
