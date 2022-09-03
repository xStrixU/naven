import type { createWorkspaceSchema, getWorkspacesSchema } from '@naven/common';

import type { TypeBoxRouteHandlerMethod } from '@/types';

export const getWorkspaces: TypeBoxRouteHandlerMethod<
  typeof getWorkspacesSchema
> = async (request, _reply) => {
  const { user, server } = request;

  const workspaces = user.workspaces.map(({ workspace }) => workspace);

  return Promise.all(
    workspaces.map(workspace => server.mapPrismaWorkspaceToWorkspace(workspace))
  );
};

export const createWorkspace: TypeBoxRouteHandlerMethod<
  typeof createWorkspaceSchema
> = async (request, reply) => {
  const {
    user,
    body: { name },
    server,
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

  return reply
    .status(201)
    .send(await server.mapPrismaWorkspaceToWorkspace(workspace));
};
