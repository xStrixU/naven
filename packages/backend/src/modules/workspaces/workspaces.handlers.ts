import { mapPrismaWorkspaceToWorkspace } from './workspaces.mapper';

import type { createWorkspaceSchema, getWorkspacesSchema } from '@naven/common';

import type { TypeBoxRouteHandlerMethod } from '@/types/types.routes';

export const getWorkspaces: TypeBoxRouteHandlerMethod<
  typeof getWorkspacesSchema
> = (request, _reply) => {
  const { user } = request;

  const workspaces = user.workspaces.map(({ workspace }) => workspace);

  return Promise.all(workspaces.map(mapPrismaWorkspaceToWorkspace));
};

export const createWorkspace: TypeBoxRouteHandlerMethod<
  typeof createWorkspaceSchema
> = async (request, reply) => {
  const {
    user,
    body: { name },
    server: { prisma },
  } = request;

  const workspaceExists = !!user.workspaces.find(
    ({ role, workspace }) => role === 'OWNER' && workspace.name === name
  );

  if (workspaceExists) {
    return reply.conflict(`Workspace with name '${name}' already exists`);
  }

  const workspace = await prisma.workspace.create({
    data: {
      name,
      users: {
        create: {
          userId: user.id,
          role: 'OWNER',
        },
      },
    },
  });

  return reply.status(201).send(await mapPrismaWorkspaceToWorkspace(workspace));
};
