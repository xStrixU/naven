import { createWorkspaceSchema, getWorkspacesSchema } from '@naven/common';

import { createWorkspace, getWorkspaces } from './workspaces.handlers';

import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';

const workspacesRoutes: FastifyPluginCallbackTypebox = (
  fastify,
  _options,
  done
) => {
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

  done();
};

export default workspacesRoutes;
