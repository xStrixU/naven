import fp from 'fastify-plugin';

import { getWorkspaceIconPath } from './workspaces.utils';

import type { Workspace } from '@naven/common';
import type { Workspace as PrismaWorkspace } from '@prisma/client';
import type { FastifyInstance, FastifyPluginCallback } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    mapPrismaWorkspaceToWorkspace: typeof mapPrismaWorkspaceToWorkspace;
  }
}

async function mapPrismaWorkspaceToWorkspace(
  this: FastifyInstance,
  workspace: PrismaWorkspace
): Promise<Workspace> {
  return {
    ...workspace,
    iconURL: `${this.config.SERVER_BASE_URL}/${await getWorkspaceIconPath(
      workspace
    )}`,
  };
}

const workspacesLocalDecorators: FastifyPluginCallback = (
  fastify,
  _options,
  done
) => {
  fastify.decorate(
    'mapPrismaWorkspaceToWorkspace',
    mapPrismaWorkspaceToWorkspace
  );

  done();
};

export default fp(workspacesLocalDecorators);
