import { createWorkspaceSchema, getWorkspacesSchema } from '@naven/common';

import { createWorkspace, getWorkspaces } from './workspaces.handlers';

import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

const workspacesRoutes: FastifyPluginAsyncTypebox = async fastify => {
  await fastify.register(import('./workspaces.decorators.local'));

  fastify.get(
    '/',
    {
      schema: getWorkspacesSchema,
      preHandler: fastify.auth,
    },
    getWorkspaces
  );

  fastify.post(
    '/',
    { schema: createWorkspaceSchema, preHandler: fastify.auth },
    createWorkspace
  );
};

export default workspacesRoutes;
