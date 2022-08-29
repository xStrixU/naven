import {
  createSessionSchema,
  deleteCurrentSessionSchema,
  getCurrentSessionSchema,
} from '@naven/common';

import {
  createSession,
  deleteCurrentSession,
  getCurrentSession,
} from './sessions.handlers';

import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';

const sessionsRoutes: FastifyPluginCallbackTypebox = (
  fastify,
  _options,
  done
) => {
  fastify.post('/', { schema: createSessionSchema }, createSession);
  fastify.get(
    '/me',
    { schema: getCurrentSessionSchema, preHandler: fastify.auth },
    getCurrentSession
  );
  fastify.delete(
    '/me',
    { schema: deleteCurrentSessionSchema },
    deleteCurrentSession
  );

  done();
};

export default sessionsRoutes;
